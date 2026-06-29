import PDFParser from "pdf2json";

export async function extractResumeText(
    fileUrl: string
): Promise<string> {

    const response = await fetch(fileUrl);

    if (!response.ok) {
        throw new Error("Failed to download resume");
    }

    const buffer = Buffer.from(
        await response.arrayBuffer()
    );

    return new Promise((resolve, reject) => {

        const pdfParser = new PDFParser();

        pdfParser.on(
            "pdfParser_dataError",
            (errData: any) => {
                reject(errData.parserError);
            }
        );

        pdfParser.on(
            "pdfParser_dataReady",
            (pdfData: any) => {

                let text = "";

                for (const page of pdfData.Pages) {

                    for (const t of page.Texts) {

                        const value =
                            t.R?.[0]?.T ?? "";

                        try {
                            text +=
                                decodeURIComponent(value) +
                                " ";
                        } catch {
                            text += value + " ";
                        }

                    }

                    text += "\n";

                }

                resolve(text);

            }
        );

        pdfParser.parseBuffer(buffer);

    });

}