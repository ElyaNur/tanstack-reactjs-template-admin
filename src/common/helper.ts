export const generatePaginationArray = (currentPage: number, totalPages: number) => {
    console.log(currentPage)
    const ellipsis = -1;
    const sideItems = 3; // Number of pages to show on each side of the current page
    const totalItems = sideItems + 4; // Total items in the full slider

    // SliderTooCloseToBeginning
    if (currentPage <= totalItems) {
        return Array.from({length: Math.min(totalPages, totalItems + sideItems)}, (_, i) => i + 1).concat(
            totalPages > totalItems ? [ellipsis, totalPages - 1, totalPages] : []
        );
    }

    // SliderTooCloseToEnding
    if (currentPage > totalPages - totalItems) {
        return [1, 2, ellipsis].concat(
            Array.from({length: Math.min(totalPages, totalItems + sideItems)}, (_, i) => totalPages - totalItems - sideItems + i + 1)
        );
    }

    // Full Slider
    return [
        1,
        2,
        ellipsis,
        ...Array.from({length: sideItems * 2 + 1}, (_, i) => currentPage - sideItems + i),
        ellipsis - 2,
        totalPages - 1,
        totalPages,
    ];
}