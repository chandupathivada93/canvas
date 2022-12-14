import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('content',{static:true}) el!: ElementRef<HTMLImageElement>
  exportPDF() {
    html2canvas(this.el.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg')
      const pdf = new jsPDF({
        orientation:'portrait'
      })
      const imageProps = pdf.getImageProperties(imgData)

      const pdfw =pdf.internal.pageSize.getWidth()

      const pdfh = (imageProps.height * pdfw) /imageProps.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh)

      pdf.save("output.pdf")
    })

  }
}
