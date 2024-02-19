import React, { useCallback, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { CardBox } from "~~/components/custom_components/cardComponent";

function ImageGallery({ imageUrls }: any) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const [mainImage, setMainImage] = useState(imageUrls[0]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const handleThumbnailClick = (imageUrl, index) => {
    setMainImage(imageUrl);
    setSelectedThumbnail(index);
  };

  useEffect(() => {
    setMainImage(imageUrls[0]);
    setSelectedThumbnail(0);
  }, [imageUrls]);

  return (
    <CardBox
      className='w-[100%] bg-transparent'
    >
      <h1 className="text-3xl font-bold">My real Estates</h1>
      <div className="flex flex-col w-[100%]  ">
        <div className="flex items-center " style={{ overflowX: "scroll" }}>
          <div className="w-[320px] h-[320px] min-w-[320px] mr-5 rounded-xl ">
            <img src={imageUrls[0]} onClick={() => openImageViewer(0)} key={0} className="w-[320px] h-[320px]" />
          </div>
          <div
            className="inline w-fit"
            style={{ display: "grid", gridTemplateRows: "auto auto", gridAutoFlow: "column" }}
          >
            {imageUrls.slice(1).map((src, index) => (
              <div className="w-[200px] m-2 flex">
                <img
                  src={src}
                  onClick={() => openImageViewer(index + 1)}
                  style={{ height: "150px", width: "auto" }} // Adjusted width here
                  key={index}
                  className="rounded-md m-2  "
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        {isViewerOpen && (
          <ImageViewer
            src={imageUrls}
            currentIndex={currentImage}
            disableScroll={true}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        )}
      </div>
    </CardBox>
  );
}

export default ImageGallery;
