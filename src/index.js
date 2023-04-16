const fileInput = document.querySelector('input[type="file"');
const asciiImage = document.getElementById('ascii');

const canvas = document.getElementById('preview');
const context = canvas.getContext('2d');

fileInput.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => imgSrcToRGBMatrix(event.target.result);
    reader.readAsDataURL(file);
};