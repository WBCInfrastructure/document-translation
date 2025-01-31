// location: website/src/page/readable/view.js
// Example of downloading simplified text into a html table that can be opened in Word.
// Within the ReadableNew function add:
// Create html table of text and download
const handleTableDownload=() => {
    // generate html content
    const htmlTextContent = generateHtmlTextContent(textState);
    const tableBlob = new Blob([htmlTextContent], { type: 'text/html' });
    //create link
    const tableLink = document.createElement('a');
    tableLink.href = URL.createObjectURL(tableBlob);
    tableLink.download = 'table.html';  
    // pop link on doc and trigger click
    document.body.appendChild(tableLink);
    tableLink.click();
    document.body.removeChild(tableLink);   
};
const generateHtmlTextContent = (data) => {
    //create html table and set inline styles
    //replace new lines with breaks
    // take care of any empty items when replacing lines with breaks 
    const tableContent = data
        .filter(item => item && item.output !== null)
        .map((item) => (
        `<tr>
            <td style ="font-size:5px; color: white;">${item.itemId}</td>
            <td style ="font-size:24px;">${item.output.replace(/\n/g, '<br>')}</td>
        </tr>`
    )).join('');
    
    // wrap in html document 
    const htmlDocument = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Simply Readable Text Output</title>
            </head>
            <body>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Text</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableContent}
                    </tbody>
                </table>
            </body>
        </html>`;
    return htmlDocument;
};
// In the DISPLAY section:
// New button to download html table
function displayTextTableDownloadButton() {
    return (
        <>
            <Box variant="div" textAlign="center">
                <Button
                    iconName="external"
                    variant="link"
                    onClick={handleTableDownload}
                >
                {t("Download")}
                </Button>
            </Box>
        </>
    );
}

