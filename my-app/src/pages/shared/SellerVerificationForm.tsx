"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import { useNavigate } from 'react-router-dom';
import { User as AuthUser } from '@supabase/supabase-js';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, UploadCloud, FileCheck2, AlertTriangle, CheckCircle, Tags, Banknote, ShieldCheck, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const STEPS = [
  { step: 1, title: 'Validasi Data Diri', icon: <User className="h-4 w-4" /> },
  { step: 2, title: 'Portofolio & Keahlian', icon: <Tags className="h-4 w-4" /> },
  { step: 3, title: 'Info Pembayaran', icon: <Banknote className="h-4 w-4" /> },
  { step: 4, title: 'Pakta Integritas', icon: <ShieldCheck className="h-4 w-4" /> },
];

interface FormData {
  ktm_image_url: string;
  portfolio_url: string;
  skills: string[];
  bank_account_details: {
    bank_name: string;
    account_number: string;
  };
  integrity_pact_accepted: boolean;
}

const SellerVerificationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    ktm_image_url: '',
    portfolio_url: '',
    skills: [],
    bank_account_details: { bank_name: '', account_number: '' },
    integrity_pact_accepted: false,
  });

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('student_id, verification_status')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else if (profile) {
          setStudentId(profile.student_id || 'N/A');
          if (profile.verification_status === 'verified' || profile.verification_status === 'pending') {
            navigate('/buyer-profile'); // Redirect if already verified or pending
          }
        }
      } else {
        navigate('/login'); // Redirect if not logged in
      }
      setIsLoading(false);
    };
    fetchUserAndProfile();
  }, [navigate]);
  
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/ktm.${fileExt}`;
    
    setIsUploading(true);
    setUploadError(null);

    try {
      const { error: uploadError } = await supabase.storage.from('ktm_images').upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('ktm_images').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, ktm_image_url: publicUrl }));

    } catch (error: any) {
      setUploadError('Gagal mengunggah file. Pastikan formatnya benar dan ukuran tidak melebihi batas.');
      console.error('File upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  };

  const nextStep = () => setCurrentStep(prev => (prev < STEPS.length ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          verification_status: 'pending',
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // On success, redirect user to the landing page
      navigate('/landing'); // Redirect to where HomeNavbar is typically rendered

    } catch (error) {
      console.error('Submission error:', error);
      alert('Terjadi kesalahan saat mengirimkan data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !user) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>;
  }

  const progressValue = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {STEPS.find(s => s.step === currentStep)?.icon}
            {currentStep <= STEPS.length ? `Langkah ${currentStep} dari ${STEPS.length}: ${STEPS[currentStep - 1].title}` : 'Selesai!'}
          </CardTitle>
          <CardDescription>
            {currentStep <= STEPS.length ? 'Lengkapi data berikut untuk menjadi Penjual di SkillSwap.' : 'Data Anda telah dikirim. Kami akan meninjau aplikasi Anda.'}
          </CardDescription>
          {currentStep <= STEPS.length && <Progress value={progressValue} className="mt-2" />}
        </CardHeader>

        <CardContent>
          {/* Step 1: Data Diri */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="studentId">NIM (Nomor Induk Mahasiswa)</Label>
                <Input id="studentId" value={studentId} readOnly className="bg-gray-100 dark:bg-gray-800" />
              </div>
              <div>
                <Label htmlFor="ktm">Upload Foto KTM</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {isUploading ? <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin" /> : 
                     formData.ktm_image_url ? <FileCheck2 className="mx-auto h-12 w-12 text-green-500" /> : 
                     <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />}
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <Label htmlFor="ktm-upload" className="relative cursor-pointer bg-white dark:bg-gray-900 rounded-md font-medium text-primary hover:text-primary-focus">
                        <span>{isUploading ? "Mengunggah..." : (formData.ktm_image_url ? "Ganti File" : "Pilih file untuk diunggah")}</span>
                        <Input id="ktm-upload" name="ktm-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg" disabled={isUploading} />
                      </Label>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {isUploading ? "Mohon tunggu..." : (formData.ktm_image_url ? "File berhasil diunggah!" : "PNG, JPG hingga 2MB")}
                    </p>
                  </div>
                </div>
                {uploadError && <p className="text-sm text-red-500 mt-2 flex items-center gap-1"><AlertTriangle className="h-4 w-4"/> {uploadError}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Portfolio & Skills */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="portfolio">URL Portofolio (opsional)</Label>
                <Input id="portfolio" placeholder="https://behance.net/username" value={formData.portfolio_url} onChange={(e) => setFormData(prev => ({...prev, portfolio_url: e.target.value}))}/>
              </div>
              <div>
                <Label htmlFor="skills">Keahlian (pisahkan dengan koma)</Label>
                <Input id="skills" placeholder="cth: Desain Grafis, React, Public Speaking" value={formData.skills.join(', ')} onChange={handleSkillsChange}/>
              </div>
            </div>
          )}

          {/* Step 3: Payment Details */}
          {currentStep === 3 && (
             <div className="space-y-4">
              <div>
                <Label htmlFor="bankName">Nama Bank</Label>
                <Input id="bankName" placeholder="Contoh: BCA" value={formData.bank_account_details.bank_name} onChange={(e) => setFormData(prev => ({...prev, bank_account_details: {...prev.bank_account_details, bank_name: e.target.value}}))}/>
              </div>
              <div>
                <Label htmlFor="accountNumber">Nomor Rekening</Label>
                <Input id="accountNumber" placeholder="1234567890" value={formData.bank_account_details.account_number} onChange={(e) => setFormData(prev => ({...prev, bank_account_details: {...prev.bank_account_details, account_number: e.target.value}}))}/>
              </div>
            </div>
          )}

          {/* Step 4: Integrity Pact */}
          {currentStep === 4 && (
            <div className="items-top flex space-x-2 mt-4">
              <Checkbox id="integrityPact" checked={formData.integrity_pact_accepted} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, integrity_pact_accepted: !!checked }))} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="integrityPact" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Pakta Integritas Akademik
                </Label>
                <p className="text-sm text-muted-foreground">
                  Saya berjanji tidak akan menyediakan, menawarkan, atau terlibat dalam segala bentuk kecurangan akademik, termasuk namun tidak terbatas pada pengerjaan tugas akhir (skripsi/tesis), ujian, atau tugas-tugas lain yang dinilai secara individual.
                </p>
              </div>
            </div>
          )}
          
          {/* Step 5: Submission Complete */}
          {currentStep > STEPS.length && (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold">Pengajuan Terkirim!</h3>
              <p className="text-muted-foreground text-sm mt-2">Tim kami akan mereview pengajuan Anda dalam 1-3 hari kerja. Status verifikasi akan diperbarui di profil Anda.</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
            {currentStep <= STEPS.length ? (
              <>
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1 || isLoading}>
                  Kembali
                </Button>
                {currentStep < STEPS.length ? (
                  <Button onClick={nextStep}>Lanjutkan</Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!formData.integrity_pact_accepted || isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Kirim untuk Verifikasi
                  </Button>
                )}
              </>
            ) : (
              <Button className="w-full" onClick={() => navigate('/buyer-profile')}>Kembali ke Profil</Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SellerVerificationForm;
