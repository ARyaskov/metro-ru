declare module 'haversine' {
    interface HaversineOptions {
        format?: 'geojson' | 'array' | 'object' | 'string';
        unit?: 'km' | 'mile' | 'meter' | 'nmi';
        threshold?: number;
    }

    interface Position {
        latitude: number;
        longitude: number;
    }

    function haversine(
        start: Position,
        end: Position,
        options?: HaversineOptions
    ): number;

    export = haversine;
}
