
export const _cssWidthPercent = 0.8
export const _cssWidthMin = 800

export const viewPort = () => {
    return window.screen.width < 1280
        ? window.screen.width - 5
        : window.screen.width * 0.8
}