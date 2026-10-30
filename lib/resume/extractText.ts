import fs from "fs";
import path from "path";
import PDFParser from "pdf2json";

function getLocalPath(fileUrl: string): string {
    // If it's already an absolute Windows path (e.g. D:\... or C:\...)
    if (/^[a-zA-Z]:[/\\]/.test(fileUrl)) {
        return fileUrl;
    }
    // Remove any leading slashes or backslashes
    const cleanPath = fileUrl.replace(/^[/\\]+/, "");
    return path.join(process.cwd(), "public", cleanPath);
}

export async function extractResumeText(
    fileUrl: string
): Promise<string> {

    let buffer: Buffer;

    if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
        console.log("Downloading remote resume:", fileUrl);

        const response = await fetch(fileUrl);

        if (!response.ok) {
            throw new Error(`Failed to download resume (status ${response.status})`);
        }

        buffer = Buffer.from(await response.arrayBuffer());
    } else {
        const localPath = getLocalPath(fileUrl);
        console.log("Reading local resume from:", localPath);

        buffer = await fs.promises.readFile(localPath);
    }

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
