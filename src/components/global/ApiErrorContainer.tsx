"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ChevronLeft, ChevronRight, X } from "lucide-react";

// Shadcn UI
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/formatter"; // Supondo que você tenha essa lib do exemplo anterior

// Tipagem exata do "data" da sua API
type ApiErrorData = Record<string, string[]>;

interface ApiErrorNavigatorProps {
  errors: ApiErrorData | null; // Pode ser null se não houver erro
  onClose?: () => void; // Para permitir fechar manualmente
}

export function ApiErrorNavigator({ errors, onClose }: ApiErrorNavigatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Cálculo seguro (mesmo se errors for null)
  const errorList = errors
    ? Object.entries(errors).flatMap(([field, messages]) =>
        messages.map((msg) => ({ field, message: msg })),
      )
    : [];

  const totalErrors = errorList.length;

  // 3. Hook sempre roda (note que ele depende de totalErrors, que é seguro)
  useEffect(() => {
    if (currentIndex >= totalErrors) {
      setCurrentIndex(Math.max(0, totalErrors - 1));
    }
  }, [totalErrors, currentIndex]);

  // 4. AGORA sim podemos retornar null se não tiver erros
  if (!errors || totalErrors === 0) return null;

  const currentError = errorList[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalErrors);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalErrors) % totalErrors);
  };

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <Alert
        variant="destructive"
        className="flex items-start gap-2 shadow-2xl border-destructive/50 text-destructive"
      >
        <AlertCircle className="h-5 w-5 mt-0.5" />

        <div className="flex-1 ml-2">
          <AlertTitle className="text-sm font-bold flex items-center justify-between">
            <span>Error:</span>
            {onClose && (
              <button
                onClick={onClose}
                className="text-destructive/50 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </AlertTitle>

          <AlertDescription className="mt-1 text-sm flex text-start text-destructive/90 font-medium">
            <span className="font-bold">{capitalize(currentError.field)}:</span>
            <span>{currentError.message}</span>
          </AlertDescription>
        </div>

        {totalErrors > 1 && (
          <div className="flex items-center gap-1 -mt-1 -mr-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="h-8 w-8 hover:bg-red-100 hover:text-red-700 text-destructive"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-xs font-mono tabular-nums">
              {currentIndex + 1}/{totalErrors}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="h-8 w-8 hover:bg-red-100 hover:text-red-700 text-destructive"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Alert>
    </div>
  );
}
