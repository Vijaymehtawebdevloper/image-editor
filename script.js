
const fileInput = document.querySelector(".file-input");
const previewImg = document.querySelector(".preview-img img");
const chooseImage = document.querySelector(".choose-img");
const filterOptions = document.querySelectorAll(".filter button");
const rotateOptions = document.querySelectorAll(".rotate button");
const filterName = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const filterValue = document.querySelector(".filter-info .value");
const resetFilterBtn = document.querySelector(".reset-filter");
const saveImgBtn = document.querySelector(".save-img");


let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;



const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical}`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0]; //getting user selected file
    if(!file) return; //return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file); //passing file url as preview img src
    previewImg.addEventListener("load", () =>{
        docunent.querySelector(".container").classList.remove("disable")
    })
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => { //getting click event listener to all filter button
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness"){
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }else if(option.id === "saturation"){
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }else if(option.id === "inversion"){
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }else if(option.id === "grayscale"){
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
        
    })
})

const updateFilter = ()=>{
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
    }else if (selectedFilter.id === "saturation"){
        saturation = filterSlider.value;
    }else if (selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
    }else if (selectedFilter.id === "grayscale"){
        grayscale = filterSlider.value;
    }
    applyFilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left"){
            rotate -= 90;
        }else if (option.id === "right"){
            rotate += 90;
        }else if (option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
            
        }else{
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    })
})

const resetFilter = () => {
     brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
     rotate = 0; flipHorizontal = 1; flipVertical = 1;
     filterOptions[0].click();
     applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas"); //creating canvas element
    const ctx = canvas.getContext("2d");  //canvas.getContext return a drawing context on the canvas
    canvas.width = previewImg.naturalWidth; //setting canvas width to actual img width
    canvas.height = previewImg.naturalHeight; //setting canvas height to actual img height

    // applying user selected filters to canvas filter
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); //translate canvas from center
    if(rotate !==0){
        ctx.rotate(rotate * Math.PI / 180);
    }

    ctx.scale(flipHorizontal, flipVertical); //flip canvas horizontaly / verticaly
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height); 
    

    const link = document.createElement("a"); //creating a element

    link.download = "image.jpg"; // passing a tag download value to "image.jpg"
    link.href = canvas.toDataURL(); //passing a tag href value to canvas data url
    link.click(); //clicking a tag so the imege download
}


fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage)
chooseImage.addEventListener("click", () => fileInput.click());