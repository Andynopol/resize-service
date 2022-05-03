export function capitalize ( str: string ) {
    return `${ str[ 0 ].toUpperCase() }${ str.slice( 1 ) }`;
};

export function getProcentage ( full: number, x: number ) {
    return ( 100 * x ) / full;
};