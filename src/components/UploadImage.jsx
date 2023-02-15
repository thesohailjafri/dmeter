import classNames from "classnames";
import { Button } from "primereact/button";
import React from "react";

export const UploadImage = ({ image, handleClearImage, handleImageSelect }) => {
    const imageFileRef = React.useRef(null);

    function handleImageChange() {
        imageFileRef.current.click();
    }
    return (
        <div onClick={handleImageChange} className="card cursor-pointer m-0 flex align-items-center justify-content-center">
            <div>
                <label className={classNames(" align-items-center justify-content-center gap-2", { hidden: image?.url }, { flex: !image?.url })}>
                    <i className="pi pi-image text-2xl"></i>
                    Select Image
                </label>
                <input type="file" accept="image/png, image/jpeg, image/webp, image/jpg" ref={imageFileRef} className="p-hidden" onChange={handleImageSelect} />
            </div>
            {image?.url && (
                <div className="">
                    <img className="mb-2 w-full border-round-md overflow-hidden" src={image?.url} alt={image?.file?.name} />
                    <div className="flex justify-content-center">
                        <Button label="Change Image" icon="pi pi-image" className="p-button mr-2" onClick={handleImageChange} />
                        <Button label="Clear Image" icon="pi pi-times" className="p-button-danger" onClick={handleClearImage} />
                    </div>
                </div>
            )}
        </div>
    );
};
