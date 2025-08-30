import { SCALE_STEP } from './const';
import { imgUploadPreview } from './upload-form';

const scaleControl = document.querySelector('.scale__control--value');

let scale = 1;

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const scaleDefault = () => {
  scale = 1;
  imgUploadPreview.style.transform = `scale(${scale})`;
  scaleControl.value = `${scale * 100}%`;
};

export {
  onSmallerClick,
  onBiggerClick,
  scaleDefault
};
