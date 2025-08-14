import { z } from "zod";
import { readFileSync } from "fs";
import { join } from "path";
import { generateObject } from "ai";
import { anthropicModel } from "./models";

const schema = z
  .object({
    total: z.number().optional().describe("The total amount of the invoice."),
    currency: z
      .string()
      .optional()
      .describe("The currency of the total amount."),
    invoiceNumber: z.string().optional().describe("The invoice number."),
    companyAddress: z
      .string()
      .optional()
      .describe("The address of the company or person issuing the invoice."),
    companyName: z
      .string()
      .optional()
      .describe("The name of the company issuing the invoice."),
    invoiceeAddress: z
      .string()
      .optional()
      .describe("The address of the company or person receiving the invoice."),
  })
  .describe("The extracted data from the invoice.");

export const extractDataFromInvoice = async (invoicePath: string) => {
  const { object } = await generateObject({
    model: anthropicModel,
    system:
      `You will receive an invoice. ` +
      `Please extract the data from the invoice. if you don't find some fields just add undefined`,
    schema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: readFileSync(invoicePath),
            mimeType: "application/pdf",
          },
        ],
      },
    ],
  });

  return object;
};

const init = async () => {
  const pdfPath = join(__dirname, "sample-invoice.pdf");
  const result = await extractDataFromInvoice(pdfPath);

  console.dir(result, { depth: 3 });
};

init();
