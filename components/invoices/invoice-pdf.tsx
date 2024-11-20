import { format } from "date-fns";
import PDFDocument from "pdfkit";

export async function generateInvoicePDF(
  invoice: any,
  client: any,
): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    // Header
    doc.fontSize(24).text("INVOICE", { align: "center" });
    doc.moveDown();

    // Invoice Details
    doc.fontSize(12);
    doc.text(`Invoice Number: ${invoice.number}`);
    doc.text(`Date: ${format(new Date(invoice.date), "MMM dd, yyyy")}`);
    doc.text(`Due Date: ${format(new Date(invoice.dueDate), "MMM dd, yyyy")}`);
    doc.moveDown();

    // Client Details
    doc.text("Bill To:");
    doc.text(client.name);
    if (client.company) doc.text(client.company);
    doc.text(client.address);
    doc.text(client.email);
    doc.text(client.phone);
    doc.moveDown();

    // Items Table
    const tableTop = doc.y;
    const itemsTableHeaders = ["Description", "Quantity", "Rate", "Amount"];
    const itemsTableProperties = ["description", "quantity", "rate", "amount"];
    const tableWidth = doc.page.width - 100;
    const columnWidth = tableWidth / 4;

    // Draw headers
    itemsTableHeaders.forEach((header, i) => {
      doc.text(header, 50 + i * columnWidth, tableTop, {
        width: columnWidth,
        align: "left",
      });
    });

    // Draw items
    let tableRow = tableTop + 20;
    invoice.items.forEach((item: any) => {
      itemsTableProperties.forEach((prop, i) => {
        const value =
          prop === "rate" || prop === "amount"
            ? `$${item[prop].toFixed(2)}`
            : item[prop].toString();
        doc.text(value, 50 + i * columnWidth, tableRow, {
          width: columnWidth,
          align: "left",
        });
      });
      tableRow += 20;
    });

    doc.moveDown();
    doc.moveDown();

    // Totals
    const subtotal = invoice.amount / (1 + invoice.tax);
    const tax = invoice.amount - subtotal;

    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, { align: "right" });
    doc.text(`Tax (${(invoice.tax * 100).toFixed(0)}%): $${tax.toFixed(2)}`, {
      align: "right",
    });
    doc
      .fontSize(14)
      .text(`Total: $${invoice.amount.toFixed(2)}`, { align: "right" });

    // Notes
    if (invoice.notes) {
      doc.moveDown();
      doc.fontSize(12).text("Notes:", { underline: true });
      doc.text(invoice.notes);
    }

    doc.end();
  });
}
