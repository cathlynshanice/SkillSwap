import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, User, Download, FileText, Upload, ArrowLeft, MessageSquare, CheckCircle, XCircle, Search, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import ProfileSidebar from "@/components/ProfileSidebar"; 

// --- Dummy Data (Fully translated with descriptions added) ---
const dummyJobs = [
    {
        id: 2025111901,
        gigTitle: "Financial Portfolio Analysis Report",
        clientName: "Budi Santoso",
        status: "ACTIVE",
        date: "Nov 15, 2025",
        dueDate: "Nov 25, 2025",
        price: "IDR 500,000",
        type: "Financial Analysis",
        description: "Request for an in-depth analysis report on the client's stock and bond investment portfolio over the last 6 months. Must include risk metrics (VaR, Beta) and diversification recommendations.",
    },
    {
        id: 2025111902,
        gigTitle: "3-Page Website Design using Figma",
        clientName: "Tia Agustina",
        status: "REVISION",
        date: "Nov 14, 2025",
        dueDate: "Nov 20, 2025",
        price: "IDR 350,000",
        type: "UI/UX Design",
        description: "Designing the UI/UX for three main pages: Landing Page, Profile Page, and Checkout Page. Focus on modern design and intuitive navigation.",
    },
    {
        id: 2025111903,
        gigTitle: "Facebook Ads Campaign Setup",
        clientName: "Rina Sari",
        status: "DELIVERED",
        date: "Nov 10, 2025",
        dueDate: "Nov 13, 2025",
        price: "IDR 400,000",
        type: "Digital Marketing",
        description: "Creating and managing a Facebook/Instagram ad campaign to boost brand awareness and conversion for a beauty product over 7 days.",
    },
    {
        id: 2025111904,
        gigTitle: "Insurance Sales Strategy Consultation",
        clientName: "Dewi Kirana",
        status: "COMPLETED",
        date: "Nov 01, 2025",
        dueDate: "Nov 03, 2025",
        price: "IDR 250,000",
        type: "Sales Consulting",
        description: "2-hour consultation session to design a new sales approach strategy (cold calling and digital lead generation) for health insurance products.",
    },
    {
        id: 2025111905,
        gigTitle: "PostgreSQL Database Migration",
        clientName: "Andi Wijaya",
        status: "ACTIVE",
        date: "Nov 16, 2025",
        dueDate: "Nov 30, 2025",
        price: "IDR 750,000",
        type: "Technology",
        description: "Migrating all user data from an old MySQL database to a new PostgreSQL environment, ensuring data integrity and minimal downtime.",
    },
];

// Status Map (for consistent UI styling)
const statusMap = {
    ACTIVE: { label: "Active", color: "bg-blue-500/10 text-blue-600", icon: Clock },
    REVISION: { label: "Revision", color: "bg-red-500/10 text-red-600", icon: XCircle },
    DELIVERED: { label: "Delivered", color: "bg-yellow-500/10 text-yellow-600", icon: Package },
    COMPLETED: { label: "Completed", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
    CANCELLED: { label: "Cancelled", color: "bg-gray-500/10 text-gray-600", icon: XCircle },
};

export default function JobDetail() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [job, setJob] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Fix: Convert ID string from useParams() to Number for matching dummy data
        const jobIdAsNumber = parseInt(id, 10); 
        const selectedJob = dummyJobs.find(o => o.id === jobIdAsNumber); 
        setJob(selectedJob);

    }, [id]);

    if (!job) {
        return <div className="p-10 text-center text-gray-500">Loading Job Details...</div>;
    }
    
    const statusInfo = statusMap[job.status];

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmitDelivery = (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select the file to be submitted.");
            return;
        }
        
        console.log("Submitting file:", file.name, "for Order:", job.id);
        alert(`File ${file.name} successfully submitted. Order status updated to DELIVERED.`);
        navigate('/myjobs'); 
    };

    return(
        <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
        <ProfileSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => navigate('/home')}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <button 
              onClick={() => navigate('/myJobs')}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              My Jobs
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">{job.id}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/myjobs')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold mb-2">{job.gigTitle}</h1>
            <div className="flex items-center gap-2 mb-6">
                <Badge className={`text-base font-semibold ${statusInfo.color}`} variant="outline">
                    <statusInfo.icon className="h-4 w-4 mr-2" />
                    STATUS: {statusInfo.label.toUpperCase()}
                </Badge>
                <p className="text-sm text-gray-500">Job ID: {job.id}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Main Details) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Job Details</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {job.description || "Job description not available."} 
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Category</p>
                                <p className="font-medium">{job.type}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Order Date</p>
                                <p className="font-medium">{job.date}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Due Date</p>
                                <p className="font-medium text-red-500">{job.dueDate}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Card Komunikasi Dihapus di sini */}
                    
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Requirements and Files</h2>
                        <p className="text-gray-500 italic mb-4">
                            Client-submitted files are available for download.
                        </p>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download Requirement File
                        </Button>
                    </Card>
                </div>
                
                {/* Right Column (Client & Payment) */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Client Information</h2>
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-500" />
                            <p className="font-medium">{job.clientName}</p>
                        </div>
                    </Card>

                    <Card className="p-6 bg-blue-50 dark:bg-gray-700">
                        <div className="mb-4 border-b pb-2 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Payment</h2>
                            <Button size="sm" variant="outline" onClick={() => console.log('Propose price change')}>
                                <MoreVertical className="h-4 w-4 mr-2" />
                                Propose Change
                            </Button>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-green-600">
                            <span>Total Fee:</span>
                            <span>{job.price}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Payment Status: Paid (Escrow)</p>
                    </Card>

                    {/* Tombol Komunikasi Ditempatkan di sini */}
                    <Button 
                        onClick={() => navigate('/messages')} 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    >
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Open Client Chat
                    </Button>
                </div>
            </div>

            {/* Final File Submission Form */}
            {/* Form is visible for ACTIVE or REVISION status */}
            {(job.status === 'ACTIVE' || job.status === 'REVISION') && (
                <Card className="p-6 mt-6 border-2 border-dashed border-blue-400 dark:border-blue-600">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Upload className="h-5 w-5 text-blue-600" />
                        Submit Final Deliverable
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Upon submission, the job status will change to **DELIVERED**. The client will then have time to review the work.
                    </p>
                    
                    <form 
                        className="space-y-4" 
                        onSubmit={handleSubmitDelivery}>
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            required 
                            className="w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300
                            "
                        />
                        <Button type="submit" disabled={!file} className="w-full bg-blue-600 hover:bg-blue-700">
                            <FileText className="h-4 w-4 mr-2" />
                            Deliver Work ({file ? file.name : 'Select File'})
                        </Button>
                    </form>
                </Card>
            )}

            {/* Status DELIVERED */}
            {job.status === 'DELIVERED' && (
                <Card className="p-6 mt-6 border-2 border-dashed border-yellow-400 dark:border-yellow-600">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-600">
                        <Package className="h-5 w-5 text-yellow-600" />
                        Awaiting Client Review
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        The job was successfully delivered on {job.date}. The client is currently in the review period.
                    </p>
                     <Button variant="outline" className="mt-4">
                        Start Communication
                    </Button>
                </Card>
            )}

            {/* Status COMPLETED */}
            {job.status === 'COMPLETED' && (
                <Card className="p-6 mt-6 border-2 border-solid border-green-500 dark:border-green-600 bg-green-50/50 dark:bg-green-900/10">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Job Completed Successfully!
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Payment has been successfully released. You can archive this order or leave feedback for the client.
                    </p>
                     <Button 
                        variant="default" 
                        className="mt-4 bg-green-600 hover:bg-green-700"
                        onClick={()=> {navigate('/reviews')}}>
                        View Rating
                    </Button>
                </Card>
            )}
            
        </div>
        </div>
        </div>
    );
}