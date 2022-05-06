export const DEFAULT_STYLE = `
    .resize-main-context{
        display: flex !important;
    }
    .resize-separator{
        background-color: #000;
        z-index: 9999;
    }
`;

export const VERTICAL_DEDICATED_STYLE = `
    .resize-main-context.vertical-resize-context{
        flex-direction: column;
    }
    .resize-separator.vertical-resize-separator{
        width: 100%;
        height: 8px;
        cursor: ns-resize;
    }
`;

export const HORIZONTAL_DEDICATED_STYLE = `
    .resize-main-context.horizontal-resize-context{
        flex-direction: row;
    }
    .resize-separator.horizontal-resize-separator{
        height: 100%;
        width: 8px;
        cursor: ew-resize;
    }
`;
