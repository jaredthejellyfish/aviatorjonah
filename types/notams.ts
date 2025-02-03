export interface NotamResponse {
	pageSize: number;
	pageNum: number;
	totalCount: number;
	totalPages: number;
	items: NotamFeature[];
}

export interface NotamFeature {
	type: "Feature";
	properties: {
		coreNOTAMData: {
			notamEvent: {
				scenario: string;
			};
			notam: {
				id: string;
				series?: string;
				number: string;
				type: "N" | "C" | string;
				issued: string;
				affectedFIR: string;
				selectionCode?: string;
				traffic?: string;
				purpose?: string;
				scope?: string;
				minimumFL: string;
				maximumFL: string;
				location: string;
				effectiveStart: string;
				effectiveEnd: string;
				text: string;
				classification: "DOM" | "INTL";
				accountId: string;
				lastUpdated: string;
				icaoLocation: string;
				schedule?: string;
				coordinates?: string;
				radius?: string;
			};
			notamTranslation: NotamTranslation[];
		};
	};
	geometry: {
		type: "GeometryCollection";
		geometries: Array<PointGeometry | PolygonGeometry>;
	};
}

export interface NotamTranslation {
	type: "LOCAL_FORMAT" | "ICAO";
	simpleText?: string;
	formattedText: string;
}

export interface PointGeometry {
	type: "Point";
	coordinates: [number, number];
	additionalGeometryData?: Record<string, unknown>;
}

export interface PolygonGeometry {
	type: "Polygon";
	subType?: "Polygon";
	coordinates: Array<Array<[number, number]>>;
}
