"use client";

import * as React from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./component/pdf";
import jsPDF from "jspdf";
import { Box, CircularProgress } from "@mui/material";
import 'jspdf-autotable'; 
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function PrintPDF({orderId}:any) {
  const componentRef = React.useRef<HTMLDivElement>(null);
  const onBeforeGetContentResolve = React.useRef<(() => void) | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    setLoading(true);
    setText("Loading new text...");

    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, []);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "YMTInvoice",
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [text]);

  return (
    <div>
      {loading &&  <CircularProgress />}
      <Box className="cursor-pointer" onClick={handlePrint}>
        <PictureAsPdfIcon color="primary" fontSize="large"/>
      </Box>
      <Box className="hidden">
        <ComponentToPrint ref={componentRef} orderId={orderId} />
      </Box>
    </div>
  );
}
