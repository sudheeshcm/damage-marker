import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./demo.css";

const defaultSrc =
  "https://i2-prod.birminghammail.co.uk/incoming/article15193650.ece/ALTERNATES/s615b/0_BMW-damaged-in-crash-on-Willenhall-Road.jpg";

export const Demo = () => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [cropCoordinates, setCropperCoordinates] = useState();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const reset = () => {
    cropper.reset();
  }

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      const cropData = cropper.getData(true);
      console.log("cropper", cropper);
      console.log("cropData", cropData);
      setCropperCoordinates(cropData);
      // console.log("cropped URL", cropper.getCroppedCanvas().toDataURL());
      console.log("cropper canvas", cropper.getCroppedCanvas());
      // console.log("cropper data", cropData);
      setCropData(cropper.getCroppedCanvas().toDataURL());
      drawImage(image, cropData.width, cropData.height, cropData.x, cropData.y)
    }
  };

  return (
    <div>
      <div style={{ width: "70%" }}>
        <input type="file" onChange={onChange} />
        <button
          onClick={() => {
            reset();
            setImage(defaultSrc);
          }}
        >
          Use default img
        </button>
        <br />
        <br />
        <Cropper
          style={{ height: 400, width: 600 }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      </div>
      <div style={{display: "flex", flexWrap: "wrap"}}>
        <div className="box" style={{ width: "50%",  }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", height: "300px" }}
          />
        </div>
        <div
          className="box"
          style={{ width: "50%", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ maxWidth: "300px" }} src={cropData} alt="cropped" />
        </div>
      </div>
      <br style={{ clear: "both" }} />


      <h1>Computed image</h1>
      <div style={{display: "none"}} >
        <img alt="crop" src={image} id="preview" width="300" height="200"/>
      </div>
      <canvas id="draw-canvas"></canvas>
      <pre style={{
        textAlign: 'left',
        fontSize: 12,
        backgroundColor: 'black'
      }}>
        {JSON.stringify(cropCoordinates, ' ', 2)}
      </pre>
      
    </div>
  );
};

export default Demo;

function drawImage(url, width, height, x, y) {
  var canvas =  document.getElementById("draw-canvas");
  var context = canvas.getContext('2d');
  const image = document.getElementById('preview');

  // set canvas dimensions
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, x, y, width, height, 0, 0, width, height);
  
}
