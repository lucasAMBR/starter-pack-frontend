import { useEffect, useState } from "react";
import { FieldErrors, UseFormSetFocus } from "react-hook-form";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

// Importações do Shadcn UI
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"; // Opcional, para os botões ficarem bonitos
import { capitalize } from "@/lib/formatter";

interface FormErrorNavigatorProps<T extends Record<string, any>> {
  errors: FieldErrors<T>;
  excludeFields?: string[];
}

export function ErrorAdviseContainer<T extends Record<string, any>>({
  errors,
  excludeFields = [],
}: FormErrorNavigatorProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const errorList = Object.entries(errors)
    .map(([field, error]) => ({
      field: field as string,
      message: error?.message as string,
    }))
    .filter((item) => {
      const hasMessage = typeof item.message === "string";
      const isExcluded = excludeFields.includes(item.field);

      return hasMessage && !isExcluded;
    });

  const totalErrors = errorList.length;

  useEffect(() => {
    if (currentIndex >= totalErrors) {
      setCurrentIndex(Math.max(0, totalErrors - 1));
    }
  }, [totalErrors, currentIndex]);

  if (totalErrors === 0) return null;

  const currentError = errorList[currentIndex];

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % totalErrors;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + totalErrors) % totalErrors;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <Alert
        variant="destructive"
        className="flex items-start gap-2 shadow-lg border-destructive/50 text-destructive"
      >
        <AlertCircle className="h-5 w-5 mt-0.5" />

        <div className="flex-1 ml-2">
          <AlertTitle className="text-sm font-bold flex items-center justify-between">
            <span>Errors:</span>
          </AlertTitle>

          <AlertDescription className="mt-1 text-sm text-start text-destructive/90 font-medium">
            {capitalize(currentError.field)}: {currentError.message}
          </AlertDescription>
        </div>

        <div className="flex items-center gap-1 -mt-1 -mr-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="h-8 w-8 hover:bg-red-100 hover:text-red-700 text-destructive"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Anterior</span>
          </Button>
          <span>
            {currentIndex + 1} of {totalErrors}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="h-8 w-8 hover:bg-red-100 hover:text-red-700 text-destructive"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próximo</span>
          </Button>
        </div>
      </Alert>
    </div>
  );
}
