import classNames from "classnames";
import { Button } from "primereact/button";
import React from "react";

export const AddImage = ({ image, handleRemoveImage, handleClearImage, handleImageSelect, isRemove = false, isClear = false, disabled }) => {
    const imageFileRef = React.useRef(null);

    function handleImageChange() {
        imageFileRef.current.click();
    }
    return (
        <div className="card cursor-pointer m-0 flex align-items-center justify-content-center">
            <div className={classNames("w-full align-items-center gap-2", { hidden: image?.url }, { flex: !image?.url })}>
                <label onClick={handleImageChange} className="flex-grow-1 flex align-items-center justify-content-center gap-2">
                    <i className="pi pi-image text-2xl"></i>
                    Select Image
                </label>
                <input type="file" accept="image/png, image/jpeg, image/webp, image/jpg" ref={imageFileRef} className="p-hidden" onChange={handleImageSelect} />
                {isRemove && <Button disabled={disabled} icon="pi pi-trash" className="p-button-danger" onClick={handleRemoveImage} tooltip="Delete Image" />}
            </div>

            {image?.url && (
                <div className="">
                    <img className="mb-2 w-full border-round-md overflow-hidden" src={image?.url} alt={image?.file?.name} />
                    <div className="flex justify-content-center">
                        <Button disabled={disabled} label="Change Image" icon="pi pi-image" className="p-button mr-2" onClick={handleImageChange} />
                        {isRemove && <Button disabled={disabled} label="Delete Image" icon="pi pi-trash" className="p-button-danger" onClick={handleRemoveImage} tooltip="Delete Image" />}
                        {isClear && <Button disabled={disabled} label="Clear Image" icon="pi pi-times" className="p-button-danger" onClick={handleClearImage} tooltip="Clear Image" />}
                    </div>
                </div>
            )}
        </div>
    );
};
