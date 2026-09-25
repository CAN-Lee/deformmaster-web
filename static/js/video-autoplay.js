document.querySelectorAll('video[autoplay]').forEach((video) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-play-fallback';
    button.textContent = '点击播放';
    button.lang = 'zh-CN';
    button.hidden = true;
    video.insertAdjacentElement('afterend', button);

    const showFallback = () => {
        button.hidden = !video.paused;
    };

    const play = () => {
        // Call directly from the click handler to preserve user activation.
        try {
            const attempt = video.play();
            if (attempt && typeof attempt.catch === 'function') {
                attempt.catch(showFallback);
            }
        } catch {
            showFallback();
        }
    };

    video.addEventListener('playing', () => {
        button.hidden = true;
    });
    button.addEventListener('click', play);

    // Keep native autoplay; this attempt also detects browser policy rejection.
    if (video.paused) play();
});
