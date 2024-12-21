"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Card } from "../ui/card";
import { useState } from "react";
import { toPng } from "html-to-image";
import Certificate from "../certificate/certificate";
import {
  certificateFormSchema,
  type CertificateFormData,
} from "@/lib/validators/certificate";

export default function CertificateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewData, setPreviewData] = useState<CertificateFormData | null>(null);

  // Form hook setup with validation schema
  const form = useForm<CertificateFormData>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      name: "",
      email: "",
      documents: "",
      issuedAt: new Date(),
      issuingInstitute: "",  // Corrected the name of the field here
    },
  });

  async function onSubmit(values: CertificateFormData) {
    try {
      setIsSubmitting(true);
      setPreviewData(values);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const certificate = document.getElementById("certificate");
      if (!certificate) throw new Error("Certificate element not found");

      const dataUrl = await toPng(certificate, { quality: 1.0 });

      const response = await fetch("/api/send-certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          certificateImage: dataUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send certificate");
      }

      toast.success("Certificate sent successfully!");
      form.reset();
      setPreviewData(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send certificate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verified Documents</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List verified documents (one per line)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="issuingInstitute"  // Corrected the name of the field here
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuing Institute</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC Institute" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="issuedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issued At</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={field.value.toISOString().slice(0, 16)}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Generating..." : "Generate & Send Certificate"}
            </Button>
          </form>
        </Form>
      </Card>

      {previewData && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Certificate Preview</h2>
          <Certificate data={previewData} />
        </div>
      )}
    </div>
  );
}
