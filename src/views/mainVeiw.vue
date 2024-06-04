<template>
    <div class="container">
        <div class="img">
            <div class="img_box">
                <img :src="imgSrc" :style="{ filter: filterStyles }" alt="Uploaded Image">
            </div>
            <div class="upload">
                <label for="upload">Upload</label>
                <input type="file" id="upload" @change="handleUpload">
            </div>
        </div>
        <div class="filter">
            <ul>
                <li v-for="filter in filters" :key="filter.id">
                    <label :for="filter.id">{{ filter.label }}</label>
                    <input type="range" :id="filter.id" :min="filter.min" :max="filter.max" :step="filter.step"
                        v-model="filter.value" @input="applyFilters" />
                </li>
                <li>
                    <a download="true" @click="downloadImage">Download</a>
                    <span @click="resetFilters">Reset</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'mainView',
    data() {
        return {
            imgSrc: '',
            filters: [
                { id: 'saturate', label: 'Saturate', min: 0, max: 200, value: 100 },
                { id: 'contrast', label: 'Contrast', min: 0, max: 200, value: 100 },
                { id: 'brightness', label: 'Brightness', min: 0, max: 200, value: 100 },
                { id: 'sepia', label: 'Sepia', min: 0, max: 200, value: 0 },
                { id: 'grayscale', label: 'Grayscale', min: 0, max: 1, value: 0, step: 0.1 },
                { id: 'blur', label: 'Blur', min: 0, max: 1, value: 0, step: 0.1 },
                { id: 'hue-rotate', label: 'Hue Rotate', min: 0, max: 360, value: 0, step: 1 }
            ]
        };
    },
    computed: {
        filterStyles() {
            return `
            saturate(${this.filters[0].value}%)
            contrast(${this.filters[1].value}%)
            brightness(${this.filters[2].value}%)
            sepia(${this.filters[3].value}%)
            grayscale(${this.filters[4].value})
            blur(${this.filters[5].value}px)
            hue-rotate(${this.filters[6].value}deg)`;
        }
    },
    methods: {
        resetFilters() {
            this.filters.forEach(filter => {
                filter.value = filter.id === 'saturate' || filter.id === 'contrast' || filter.id === 'brightness' ? 100 : 0;
            });
        },
        handleUpload(event) {
            this.resetFilters();
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imgSrc = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        downloadImage() {
            const link = document.createElement('a');
            link.href = this.imgSrc;
            link.download = 'image.png';
            link.click();
        }
    }
};
</script>

<style>
* {
    padding: 1px;
    margin: 1px;
    box-sizing: border-box;
    font-family: sans-serif;
}

body {
    background-color: #333;
    display: flex;
    justify-content: center;
}

.container {
    background-color: #222;
    width: 80vw;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 5fr 3fr;
}

.img {
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    align-items: center;
}

.img img {
    max-width: 45vw;
    max-height: 60vh;
}

.upload input {
    display: none;
}

.upload label {
    color: white;
    padding: 8px 20px;
    border: 2px dashed white;
    cursor: pointer;
}

span:hover,
a:hover {
    cursor: pointer;
}

.filter ul,
.filter ul li {
    display: flex;
    flex-direction: column;
    gap: 25px;
    direction: rtl;
}

.filter ul li label {
    color: white;
}

.filter ul li:last-child {
    flex-direction: row;
    justify-content: space-around;
}

.filter ul li a,
span {
    color: white;
    padding: 10px;
    background: green;
}

@media only screen and (max-width: 600px) {
    .container {
        grid-template-columns: 1fr;
        gap: 50px;
    }
}
</style>