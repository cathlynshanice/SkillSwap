"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import { useNavigate } from 'react-router-dom';
import BuyerProfile from '@/pages/seeker/BuyerProfile';
import SellerProfile from '@/pages/contributor/SellerProfile';
import { Loader2 } from 'lucide-react';
import { setUserRole } from '@/lib/userContext';

type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('verification_status')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile status:", error);
        setLoading(false);
        // Potentially render an error message page
        return;
      }

      if (profile) {
        const currentStatus = profile.verification_status as VerificationStatus;
        setStatus(currentStatus);
        // Set the role in the context based on the status from the database
        if (currentStatus === 'verified') {
          setUserRole('seller');
        } else {
          setUserRole('buyer');
        }
      } else {
        // If no profile exists, default to buyer
        setStatus('unverified');
        setUserRole('buyer');
      }
      setLoading(false);
    };

    checkVerificationStatus();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Based on the verification status, render the appropriate profile view.
  if (status === 'verified') {
    return <SellerProfile />;
  } else {
    // This will handle 'unverified', 'pending', and 'rejected' statuses,
    // showing them the buyer-centric view. We will add the specific status
    // notice inside BuyerProfile in the next step.
    return <BuyerProfile />;
  }
};

export default ProfilePage;
