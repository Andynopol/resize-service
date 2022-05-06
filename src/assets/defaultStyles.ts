export const DEFAULT_STYLE = `
    .resize-main-context{
        display: flex !important;
    }
`;

export const SEPARATOR_DEFAULT_STYLE = `
    .resize-separator{
        background-color: #000;
        z-index: 9999;
    }
    .resize-separator.vertical-resize-separator{
        width: 100%;
        height: 8px;
        cursor: ns-resize;
    }
    .resize-separator.horizontal-resize-separator{
        height: 100%;
        width: 8px;
        cursor: ew-resize;
    }
`;

export const VERTICAL_DEDICATED_STYLE = `
    .resize-main-context.vertical-resize-context{
        flex-direction: column;
    }
`;

export const HORIZONTAL_DEDICATED_STYLE = `
    .resize-main-context.horizontal-resize-context{
        flex-direction: row;
    }
`;
