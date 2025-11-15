import { QrCode, CreditCard, MessageCircle, CheckCircle2, MessageSquare } from "lucide-react";
import { useState } from "react";

interface PaymentStepsProps {
  paymentMethod: string;
  onConfirm: () => void;
  onBack: () => void;
}

export default function PaymentSteps({
  paymentMethod,
  onConfirm,
  onBack,
}: PaymentStepsProps) {
  const [showOverview, setShowOverview] = useState(true);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const methodName =
    paymentMethod === "vodafone"
      ? "Vodafone Cash"
      : paymentMethod === "endc"
        ? "e& Cash"
        : "InstaPay";

  const steps = [
    {
      number: 1,
      title: "Scan QR Code",
      description: "A QR code will be displayed for you to scan using your phone camera",
      icon: QrCode,
    },
    {
      number: 2,
      title: "Complete Payment",
      description: "Follow the payment app instructions to complete your transaction",
      icon: CreditCard,
    },
    {
      number: 3,
      title: "Confirm with WhatsApp",
      description: "Scan a WhatsApp QR code to send us your payment confirmation",
      icon: MessageCircle,
    },
  ];

  const handleStartPayment = () => {
    setShowOverview(false);
    setActiveStep(1);
  };

  const handleNextStep = () => {
    if (activeStep === 1) setActiveStep(2);
    else if (activeStep === 2) setActiveStep(3);
    else if (activeStep === 3) {
      setIsCompleted(true);
      setTimeout(() => {
        onConfirm();
      }, 2000);
    }
  };

  const handleWhatsAppSupport = () => {
    const whatsappNumber = "+1234567890"; // Replace with actual WhatsApp number
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`, "_blank");
  };

  // Show completion message
  if (isCompleted) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="text-green-500 w-24 h-24" fill="currentColor" />
        </div>
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark-black mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-lg text-dark-black/70 font-inter">
          Your payment has been successfully processed
        </p>
      </div>
    );
  }

  // Show overview first
  if (showOverview) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-8">
          <CreditCard className="text-soft-blue" size={28} />
          <h2 className="text-2xl md:text-3xl font-poppins font-bold text-dark-black">
            {methodName} Payment Steps
          </h2>
        </div>

        <div className="mb-8 p-6 bg-cream rounded-xl">
          <h3 className="font-poppins font-bold text-dark-black mb-6">
            Please review the payment process before continuing:
          </h3>

          <div className="space-y-4 mb-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex gap-4 p-4 bg-white rounded-lg border-2 border-gray-200"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-soft-blue text-white font-poppins font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-poppins font-semibold text-dark-black mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-dark-black/60 font-inter">
                      {step.description}
                    </p>
                  </div>
                  <Icon className="text-soft-blue flex-shrink-0" size={20} />
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-blue-50 border-l-4 border-soft-blue rounded-lg mb-6">
            <p className="text-sm text-dark-black font-inter">
              <span className="font-semibold">Total Amount:</span> $499.00
            </p>
            <p className="text-xs text-dark-black/60 font-inter mt-2">
              You will complete this payment after confirming these steps.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 border-2 border-soft-blue text-soft-blue rounded-lg font-poppins font-semibold hover:bg-soft-blue/10 transition-all"
          >
            Back
          </button>
          <button
            onClick={handleStartPayment}
            className="flex-1 px-6 py-3 bg-soft-blue text-white rounded-lg font-poppins font-semibold hover:bg-opacity-90 transition-all"
          >
            Start Payment
          </button>
        </div>
      </div>
    );
  }

  // Show individual step with QR code
  if (activeStep) {
    const currentStepData = steps[activeStep - 1];
    const StepIcon = currentStepData.icon;

    return (
      <div>
        <div className="flex items-center gap-3 mb-8">
          <StepIcon className="text-soft-blue" size={28} />
          <div>
            <p className="text-sm text-dark-black/60 font-inter mb-1">
              Step {activeStep} of 3
            </p>
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-dark-black">
              {currentStepData.title}
            </h2>
          </div>
        </div>

        <div className="mb-8 p-8 bg-cream rounded-xl">
          <div className="text-center mb-6">
            <StepIcon className="mx-auto mb-4 text-soft-blue" size={48} />
            <p className="text-lg text-dark-black/80 font-inter">
              {currentStepData.description}
            </p>
          </div>
          
          {(activeStep === 1 || activeStep === 3) && (
            <div className="mt-6 p-6 bg-white rounded-lg border-2 border-dashed border-gray-300 text-center">
              <p className="text-sm text-dark-black/60 font-inter mb-3">
                {activeStep === 1 ? "Payment QR Code" : "WhatsApp QR Code"}
              </p>
              <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                <QrCode className="text-dark-black/40" size={80} />
              </div>
            </div>
          )}
          
          {activeStep === 2 && (
            <div className="mt-6 p-6 bg-white rounded-lg border-2 border-dashed border-gray-300 text-center">
              <p className="text-sm text-dark-black/60 font-inter">
                Complete the payment in your {methodName} app
              </p>
            </div>
          )}
        </div>

        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-soft-blue rounded">
          <p className="text-sm text-dark-black font-inter">
            <span className="font-semibold">Step {activeStep} of 3:</span>{" "}
            {currentStepData.description}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              if (activeStep > 1) setActiveStep((activeStep - 1) as 1 | 2 | 3);
              else {
                setShowOverview(true);
                setActiveStep(null);
              }
            }}
            className="flex-1 px-6 py-3 border-2 border-soft-blue text-soft-blue rounded-lg font-poppins font-semibold hover:bg-soft-blue/10 transition-all"
          >
            {activeStep === 1 ? "Back" : "Previous"}
          </button>
          {activeStep === 3 ? (
            <>
              <button
                onClick={handleWhatsAppSupport}
                className="flex-1 px-6 py-3 border-2 border-green-500 text-green-600 rounded-lg font-poppins font-semibold hover:bg-green-50 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={20} />
                Talk to Customer Support
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 px-6 py-3 bg-soft-blue text-white rounded-lg font-poppins font-semibold hover:bg-opacity-90 transition-all"
              >
                Complete Payment
              </button>
            </>
          ) : (
            <button
              onClick={handleNextStep}
              className="flex-1 px-6 py-3 bg-soft-blue text-white rounded-lg font-poppins font-semibold hover:bg-opacity-90 transition-all"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
