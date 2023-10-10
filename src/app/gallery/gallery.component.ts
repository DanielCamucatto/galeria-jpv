import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { faChevronLeft, faChevronRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faPlusCircle = faPlusCircle;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    const imgWrappers = this.el.nativeElement.querySelectorAll(".img-wrapper");

    imgWrappers.forEach((imgWrapper: Element) => {
      const imgOverlay = imgWrapper.querySelector(".img-overlay") as HTMLElement;

      this.renderer.listen(imgWrapper, 'mouseenter', () => {
        this.renderer.setStyle(imgOverlay, 'opacity', '1');
      });

      this.renderer.listen(imgWrapper, 'mouseleave', () => {
        this.renderer.setStyle(imgOverlay, 'opacity', '0');
      });
    });

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    const image = new Image();

    overlay.appendChild(image);

    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.appendChild(overlay);
    }

    overlay.style.display = 'none';

    const imgOverlays = this.el.nativeElement.querySelectorAll(".img-overlay");
    imgOverlays.forEach((imgOverlay: Element) => {
      this.renderer.listen(imgOverlay, 'click', (event) => {
        event.preventDefault();
        const imageLocation = (imgOverlay.previousElementSibling as HTMLAnchorElement)?.getAttribute("href");
        if (imageLocation) {
          image.src = imageLocation;
          overlay.style.display = 'flex';
          overlay.style.justifyContent = 'center';
          overlay.style.alignItems = 'center';
          overlay.style.background = 'rgba(0, 0, 0, 0.7)';
          overlay.style.position = 'absolute';
          overlay.style.top = '50%'; 
          overlay.style.left = '50%'; 
          overlay.style.transform = 'translate(-50%, -50%)'; 
          overlay.style.right = '0';
          overlay.style.bottom = '0';
          overlay.style.zIndex = '999';
          overlay.style.borderRadius = '5px';
          overlay.style.width = '100%'; 
          overlay.style.height = '100%';
          overlay.classList.add('visible');
        }
      });
    });

    this.renderer.listen(overlay, 'click', () => {
      overlay.style.display = 'none';
      overlay.classList.remove('visible');
    });

    const nextButtonClicked = () => {
      const currentImage = document.querySelector("#overlay img") as HTMLElement;
      if (currentImage) {
        this.renderer.setStyle(currentImage, 'display', 'none');
        const currentImageSrc = currentImage.getAttribute("src");
        const currentImageElement = document.querySelector(`#image-gallery img[src="${currentImageSrc}"]`) as HTMLImageElement;
        const nextImageElement = currentImageElement?.closest(".image")?.nextElementSibling?.querySelector("img") as HTMLImageElement;
        const images = document.querySelectorAll("#image-gallery img");
        if (nextImageElement) {
          this.renderer.setAttribute(image, 'src', nextImageElement.src);
          this.renderer.setStyle(image, 'display', 'block');
        } else {
          this.renderer.setAttribute(image, 'src', (images[0] as HTMLImageElement).src);
          this.renderer.setStyle(image, 'display', 'flex');
        }
      }
    };

    const prevButtonClicked = () => {
      const currentImage = document.querySelector("#overlay img") as HTMLElement;
      if (currentImage) {
        this.renderer.setStyle(currentImage, 'display', 'none');
        const currentImageSrc = currentImage.getAttribute("src");
        const currentImageElement = document.querySelector(`#image-gallery img[src="${currentImageSrc}"]`) as HTMLImageElement;
        const prevImageElement = currentImageElement?.closest(".image")?.previousElementSibling?.querySelector("img") as HTMLImageElement;
        if (prevImageElement) {
          this.renderer.setAttribute(image, 'src', prevImageElement.src);
          this.renderer.setStyle(image, 'display', 'flex');
        }
      }
    };

    this.renderer.listen(document.body, 'click', (event) => {
      if (event.target === overlay) {
        overlay.style.display = 'none';
        overlay.classList.remove('visible');
      }
    });
  }
}
