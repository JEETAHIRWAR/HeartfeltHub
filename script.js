
window.addEventListener('DOMContentLoaded', () => {

    const instagramIcon = document.getElementById('instaIcon');
    instagramIcon.addEventListener('click', () => {
        window.open('https://www.instagram.com/phantomscripter007?igsh=MXdoMXpieHdxejFidg==', '_blank');
    });

    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');
    // loadingIndicator.textContent = 'Loading...';
    document.body.appendChild(loadingIndicator);

    // const firstReel = document.querySelector('.reel-video');
    // firstReel.play();

    try {
        fetch('data.json')
            .then(response => {
                loadingIndicator.remove();
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const cardsContainer = document.querySelector('.cards');

                const reels = data.reels;
                let currentReelIndex = 0;

                const playNextReel = () => {
                    currentReelIndex++;
                    if (currentReelIndex < reels.length) {
                        const nextReel = reels[currentReelIndex];
                        scrollToNextReel();
                    }
                };

                const scrollToNextReel = () => {
                    const currentReel = document.querySelectorAll('.card')[currentReelIndex];
                    const cardsContainer = document.querySelector('.cards');
                    const containerHeight = cardsContainer.clientHeight;
                    const reelHeight = currentReel.offsetHeight;
                    const reelTopPosition = currentReel.offsetTop;

                    const scrollToPosition = reelTopPosition - (containerHeight - reelHeight) / 2;

                    cardsContainer.scrollTo({
                        top: scrollToPosition,
                        behavior: 'smooth'
                    });
                };


                const playCenteredReel = (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const currentReel = entry.target.querySelector('.reel-video');
                            currentReel.play();
                        } else {
                            const currentReel = entry.target.querySelector('.reel-video');
                            currentReel.pause();
                        }
                    });
                };

                const options = {
                    root: cardsContainer,
                    rootMargin: '0px',
                    threshold: 0.5 // Change this threshold value as needed
                };

                const observer = new IntersectionObserver(playCenteredReel, options);


                data.reels.forEach(reel => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const UnameCon = document.createElement('div');
                    UnameCon.classList.add('UnameCon');

                    const UserName = document.createElement('p');
                    UserName.classList.add('UserName');
                    UserName.innerHTML = `<i class="fas fa-user"></i> ${reel.userName}`;

                    const praiseText = document.createElement('p');
                    praiseText.classList.add('praiseText');
                    praiseText.textContent = reel.praise;

                    const lsCRicons = document.createElement('div');
                    lsCRicons.classList.add('lsCRicons');
                    const likeIcon = document.createElement('i');
                    likeIcon.classList.add('fa-regular', 'fa-heart');
                    const shareIcon = document.createElement('i');
                    shareIcon.classList.add('fa-regular', 'fa-share-from-square');
                    const commentIcon = document.createElement('i');
                    commentIcon.classList.add('fa-regular', 'fa-comment');
                    const reportIcon = document.createElement('i');
                    reportIcon.classList.add('fa-solid', 'fa-circle-exclamation');

                    lsCRicons.appendChild(likeIcon);
                    lsCRicons.appendChild(shareIcon);
                    lsCRicons.appendChild(commentIcon);
                    lsCRicons.appendChild(reportIcon);


                    const videoContainer = document.createElement('div');
                    videoContainer.classList.add('video-container');
                    const reelVideo = document.createElement('video');
                    reelVideo.classList.add('reel-video');
                    reelVideo.src = reel.reelVideo;
                    reelVideo.controls = true;

                    reelVideo.addEventListener('ended', playNextReel);
                    videoContainer.appendChild(reelVideo);

                    observer.observe(card);


                    const videoProgressBar = document.createElement('div');
                    videoProgressBar.classList.add('videoProgressBar');


                    // reelVideo.ontimeupdate = function () {
                    //     const progressBar = document.querySelector('.videoProgressBar');
                    //     const progressBarValue = (reelVideo.currentTime / reelVideo.duration) * 100;
                    //     progressBar.style.width = progressBarValue + '%';
                    // };


                    UnameCon.appendChild(UserName);
                    UnameCon.appendChild(praiseText);

                    card.appendChild(UnameCon);
                    card.appendChild(lsCRicons);
                    card.appendChild(videoContainer);
                    card.appendChild(videoProgressBar);

                    cardsContainer.appendChild(card);
                });
                // const firstReel = document.querySelector('.reel-video');
                // firstReel.play();

                const playVideo = () => {
                    const firstReel = document.querySelector('.reel-video');
                    firstReel.play();
                };

                // Play the video when the page loads
                playVideo();

                // Define an array of theme colors
                const themeColors = ["#1F2544", "#FEFBF6", "#3F2305", "#000000", "#35374B", "#114232", "#B3C8CF", "#1C1678", "#003C43", "#6C0345", "#A79277", "#8644A2", "#49243E", "#0C0C0C", "#FFC94A", "#912BBC", "#D20062", "#FA7070", "#C6EBC5", "#FF9800", "#90D26D", "#FFF7FC", "#673F69", "496989", "#627254", "#00224D", "#5D0E41", "#430A5D", "#222831", "#240A34", "#030637", "#114232"];

                // Create the themes container element
                const themes = document.createElement('div');
                themes.classList.add('themes');
                themes.innerHTML = '<i class="fa-solid fa-palette"></i>';

                // Append the themes container to the second container
                const secondContainer = document.getElementById('container2');
                secondContainer.appendChild(themes);

                // Get the palette icon element
                const paletteIcon = themes.querySelector('i.fa-palette');

                // Initialize the index to track the current theme color
                let currentThemeIndex = 0;

                // Function to change the background color
                const changeBackgroundColor = () => {
                    // Get the current theme color
                    const currentColor = themeColors[currentThemeIndex];

                    // Apply the background color to the second container
                    secondContainer.style.backgroundColor = currentColor;

                    // Increment the index or reset to 0 if at the end of the array
                    currentThemeIndex = (currentThemeIndex + 1) % themeColors.length;
                };

                // Add a click event listener to the palette icon
                paletteIcon.addEventListener('click', changeBackgroundColor);

                // Initialize the background color
                changeBackgroundColor();

                // Get the container elements
                const container1 = document.getElementById('container1');
                const firstCon = document.getElementById('1stcon');
                const secondCon = document.getElementById('2ndcon');

                // Initialize current index
                let currentIndex = 0;

                // Store the total number of titleDes cards
                const totalTitleDes = data.imagesData.length;
                // Loop through the data and populate HTML elements
                data.imagesData.forEach(item => {

                    const titleDes = document.createElement('div');
                    titleDes.classList.add('titleDes');
                    titleDes.innerHTML = `<h3 class="title">${item.text1}</h3>
                <p class="description">${item.text2.replace(/\n/g, '<br>')}</p>`;
                    firstCon.appendChild(titleDes);

                    const imagesBox = document.createElement('div');
                    imagesBox.classList.add('imagesBox');
                    imagesBox.style.backgroundImage = `url(${item.image})`;

                    const secondCon = document.getElementById('2ndcon');

                    secondCon.appendChild(imagesBox);

                    imagesBox.addEventListener('click', () => {
                        const container1 = document.getElementById('container1');
                        container1.style.backgroundImage = `url(${item.image})`;

                        const containerWidth = secondCon.offsetWidth;
                        const boxWidth = imagesBox.offsetWidth;
                        const scrollAmount = containerWidth - (boxWidth * 1.6);
                        secondCon.scrollBy({
                            top: 0,
                            left: scrollAmount,
                            behavior: 'smooth'
                        });



                        // Update currentIndex to the next index (cyclically)
                        currentIndex = (currentIndex + 1) % totalTitleDes;

                        // Display the next titleDes card
                        const titleDesCards = document.querySelectorAll('.titleDes');
                        titleDesCards.forEach((card, idx) => {
                            if (idx === currentIndex) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    })

                });

                const buyMeCoffeeButton = document.createElement('div');
                buyMeCoffeeButton.classList.add('buyMeCoffeeButton');
                buyMeCoffeeButton.innerHTML = `<a href="https://www.buymeacoffee.com/jeetahirwar" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 175px !important;" ></a>`;


                firstCon.appendChild(buyMeCoffeeButton);

                // Initially hide all titleDes cards except the first one
                const titleDesCards = document.querySelectorAll('.titleDes');
                titleDesCards.forEach((card, index) => {
                    if (index === currentIndex) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });


                // Create and append a button for scrolling left
                const scrollLeftButton = document.createElement('button');
                scrollLeftButton.classList.add('scroll-left');
                const scrollLeftIcon = document.createElement('i');
                scrollLeftIcon.classList.add('fa-solid', 'fa-circle-arrow-left');
                scrollLeftButton.appendChild(scrollLeftIcon);
                scrollLeftButton.addEventListener('click', () => {
                    const containerWidth = secondCon.offsetWidth;
                    secondCon.scrollBy({
                        left: -containerWidth,
                        behavior: 'smooth'
                    });
                });
                secondCon.appendChild(scrollLeftButton);

            })
            .catch(error => {
                loadingIndicator.remove();

                console.error('Error fetching data:', error);
            });
    } catch (error) {
        // Remove loading indicator in case of error
        loadingIndicator.remove();
        console.error('Error in fetch operation:', error);
    }


});


