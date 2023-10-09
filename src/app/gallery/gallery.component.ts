import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const imgWrappers = document.querySelectorAll(".img-wrapper");
    imgWrappers.forEach((imgWrapper: Element) => {
      imgWrapper.addEventListener('mouseenter', () => {
        const imgOverlay = imgWrapper.querySelector(".img-overlay") as HTMLElement;
        if (imgOverlay) {
          imgOverlay.animate({ opacity: 1 }, 600);
        }
      });

      imgWrapper.addEventListener('mouseleave', () => {
        const imgOverlay = imgWrapper.querySelector(".img-overlay") as HTMLElement;
        if (imgOverlay) {
          imgOverlay.animate({ opacity: 0 }, 600);
        }
      });
    });

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    const image = new Image();
    const prevButton = document.createElement('div');
    prevButton.id = 'prevButton';
    prevButton.innerHTML = '<i class="fa fa-chevron-left"></i>';
    const nextButton = document.createElement('div');
    nextButton.id = 'nextButton';
    nextButton.innerHTML = '<i class="fa fa-chevron-right"></i>';
    const exitButton = document.createElement('div');
    exitButton.id = 'exitButton';
    exitButton.innerHTML = '<i class="fa fa-times"></i>';

    overlay.appendChild(image);
    overlay.appendChild(prevButton);
    overlay.appendChild(nextButton);
    overlay.appendChild(exitButton);

    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.appendChild(overlay);
    }

    overlay.style.display = 'none';

    const imgOverlays = document.querySelectorAll(".img-overlay");
    imgOverlays.forEach((imgOverlay: Element) => {
      imgOverlay.addEventListener('click', (event) => {
        event.preventDefault();
        const imageLocation = (imgOverlay.previousElementSibling as HTMLAnchorElement)?.getAttribute("href");
        if (imageLocation) {
          image.src = imageLocation;
          overlay.style.display = 'block';
        }
      });
    });

    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    const nextButtonClicked = () => {
      const currentImage = document.querySelector("#overlay img") as HTMLElement;
      if (currentImage) {
        currentImage.style.display = 'none';
        const currentImageSrc = currentImage.getAttribute("src");
        const currentImageElement = document.querySelector(`#image-gallery img[src="${currentImageSrc}"]`) as HTMLImageElement;
        const nextImageElement = currentImageElement?.closest(".image")?.nextElementSibling?.querySelector("img") as HTMLImageElement;
        const images = document.querySelectorAll("#image-gallery img");
        if (nextImageElement) {
          (document.querySelector("#overlay img") as HTMLImageElement).src = nextImageElement.src;
          (document.querySelector("#overlay img") as HTMLImageElement).style.display = 'block';
        } else {
          (document.querySelector("#overlay img") as HTMLImageElement).src = (images[0] as HTMLImageElement).src;
          (document.querySelector("#overlay img") as HTMLImageElement).style.display = 'block';
        }
      }
    };

    const prevButtonClicked = () => {
      const currentImage = document.querySelector("#overlay img") as HTMLElement;
      if (currentImage) {
        currentImage.style.display = 'none';
        const currentImageSrc = currentImage.getAttribute("src");
        const currentImageElement = document.querySelector(`#image-gallery img[src="${currentImageSrc}"]`) as HTMLImageElement;
        const prevImageElement = currentImageElement?.closest(".image")?.previousElementSibling?.querySelector("img") as HTMLImageElement;
        if (prevImageElement) {
          (document.querySelector("#overlay img") as HTMLImageElement).src = prevImageElement.src;
          (document.querySelector("#overlay img") as HTMLImageElement).style.display = 'block';
        }
      }
    };

    prevButton.addEventListener('click', prevButtonClicked);
    nextButton.addEventListener('click', nextButtonClicked);

    exitButton.addEventListener('click', () => {
      overlay.style.display = 'none';
    });
  }
}
