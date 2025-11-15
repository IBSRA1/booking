import { useEffect, useState, useRef } from "react";
import { CheckCircle, Download, Printer, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { BookingData } from "../../pages/Booking";

interface Step6Props {
  formData: BookingData;
}

export default function Step6Invoice({ formData }: Step6Props) {
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [invoiceNumber] = useState(
    `INV-${Date.now().toString().slice(-6).toUpperCase()}`
  );
  const bookingDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSuccess(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    if (invoiceRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Invoice ${invoiceNumber}</title>
              <style>
                @media print {
                  @page { margin: 20mm; }
                }
                body {
                  font-family: 'Arial', sans-serif;
                  margin: 0;
                  padding: 20px;
                  color: #333;
                }
                .invoice-header {
                  border-bottom: 3px solid #3b82f6;
                  padding-bottom: 20px;
                  margin-bottom: 30px;
                }
                .invoice-header h1 {
                  margin: 0;
                  color: #1e40af;
                  font-size: 28px;
                }
                .invoice-header p {
                  margin: 5px 0;
                  color: #666;
                }
                .invoice-info {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                  margin-bottom: 30px;
                }
                .section {
                  margin-bottom: 30px;
                  padding-bottom: 20px;
                  border-bottom: 1px solid #e5e7eb;
                }
                .section h3 {
                  color: #1e40af;
                  margin-bottom: 15px;
                  font-size: 18px;
                }
                .section-row {
                  display: flex;
                  justify-content: space-between;
                  padding: 8px 0;
                }
                .section-row span:first-child {
                  color: #666;
                }
                .section-row span:last-child {
                  font-weight: 600;
                  color: #333;
                }
                .total {
                  background: #f3f4f6;
                  padding: 20px;
                  border-radius: 8px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin: 30px 0;
                }
                .total-label {
                  font-size: 20px;
                  font-weight: 700;
                }
                .total-amount {
                  font-size: 28px;
                  color: #3b82f6;
                  font-weight: 700;
                }
                .footer {
                  margin-top: 40px;
                  padding: 20px;
                  background: #eff6ff;
                  border-left: 4px solid #3b82f6;
                  border-radius: 4px;
                }
              </style>
            </head>
            <body>
              ${invoiceRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 250);
      }
    }
  };

  const handleDownloadPDF = () => {
    handlePrint();
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      {/* Success Animation */}
      {showSuccess && (
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <CheckCircle
                className="text-soft-blue w-full h-full animate-bounce"
                fill="currentColor"
              />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark-black mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-lg text-dark-black/70 font-inter mb-4">
            Your enrollment has been successfully processed
          </p>
          <p className="text-sm text-dark-black/50 font-inter">
            Confirmation email has been sent to you and your parents
          </p>
        </div>
      )}

      {/* Invoice Section */}
      <div ref={invoiceRef} className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8">
        <div className="mb-8">
          <h3 className="text-2xl font-poppins font-bold text-dark-black mb-2">
            LearnHub
          </h3>
          <p className="text-dark-black/60 font-inter">
            Empowering Young Minds Through Quality Education
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b-2 border-gray-200">
          <div>
            <p className="text-xs text-dark-black/60 font-inter mb-1">
              Invoice Number
            </p>
            <p className="font-poppins font-bold text-dark-black">
              {invoiceNumber}
            </p>
          </div>
          <div>
            <p className="text-xs text-dark-black/60 font-inter mb-1">
              Invoice Date
            </p>
            <p className="font-poppins font-bold text-dark-black">
              {bookingDate}
            </p>
          </div>
        </div>

        {/* Program Information */}
        <div className="mb-8">
          <h4 className="font-poppins font-bold text-dark-black mb-4">
            Program Information
          </h4>
          <div className="space-y-2 text-dark-black font-inter">
            <div className="flex justify-between">
              <span>Program:</span>
              <span className="font-semibold">Coding 101</span>
            </div>
            <div className="flex justify-between">
              <span>Age Group:</span>
              <span className="font-semibold">10-13 years</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-semibold">2 months</span>
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className="mb-8">
          <h4 className="font-poppins font-bold text-dark-black mb-4">
            Student Information
          </h4>
          <div className="space-y-2 text-dark-black font-inter">
            <div className="flex justify-between">
              <span>Name:</span>
              <span className="font-semibold">
                {formData.student.firstName} {formData.student.secondName} {formData.student.thirdName} {formData.student.fourthName}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="font-semibold">
                {formData.city ? `${formData.city}, ${formData.country}` : formData.country}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Address:</span>
              <span className="font-semibold">
                {formData.address.buildingNumber} {formData.address.streetName}, {formData.address.districtName}
                {formData.address.floorNumber && `, Floor ${formData.address.floorNumber}`}
                {formData.address.apartmentNumber && `, Apt ${formData.address.apartmentNumber}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Age:</span>
              <span className="font-semibold">{formData.student.age}</span>
            </div>
            <div className="flex justify-between">
              <span>Gender:</span>
              <span className="font-semibold">{formData.student.gender}</span>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mb-8 pb-8 border-b-2 border-gray-200">
          <h4 className="font-poppins font-bold text-dark-black mb-4">
            Payment Information
          </h4>
          <div className="space-y-2 text-dark-black font-inter">
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="font-semibold">{formData.payment.method}</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction ID:</span>
              <span className="font-semibold">
                {formData.payment.transactionId}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-semibold">$499.00</span>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-8 p-4 bg-cream rounded-lg">
          <span className="font-poppins font-bold text-dark-black text-lg">
            Total Amount Paid:
          </span>
          <span className="font-poppins font-bold text-soft-blue text-2xl">
            $499.00
          </span>
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-blue-50 border-2 border-soft-blue rounded-lg">
          <p className="text-sm text-dark-black font-inter">
            ✓ Thank you for your enrollment! You'll receive a confirmation email with next steps and program details.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-soft-blue text-white rounded-lg font-poppins font-semibold hover:bg-opacity-90 transition-all"
        >
          <Download size={20} />
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-soft-blue text-soft-blue rounded-lg font-poppins font-semibold hover:bg-soft-blue/10 transition-all"
        >
          <Printer size={20} />
          Print Invoice
        </button>
      </div>

      {/* Go to Dashboard Button */}
      <button
        onClick={handleGoToDashboard}
        className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-soft-blue text-white rounded-lg font-poppins font-semibold hover:bg-opacity-90 transition-all"
      >
        <LayoutDashboard size={20} />
        Go to Your Dashboard
      </button>
    </div>
  );
}
