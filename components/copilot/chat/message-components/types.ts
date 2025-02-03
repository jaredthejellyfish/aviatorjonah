export interface ToolCallArguments {
	city?: string;
	state?: string;
	countryCode?: string;
	title?: string;
	content?: string;
	nextStep?: string;
	[key: string]: string | undefined;
}

export interface MetarData {
	lat: number;
	lon: number;
	slp: number;
	dewp: number;
	elev: number;
	maxT: number | null;
	minT: number | null;
	name: string;
	snow: number | null;
	temp: number;
	wdir: number;
	wgst: number | null;
	wspd: number;
	altim: number;
	prior: number;
	rawOb: string;
	visib: number;
	clouds: Array<{
		base: number;
		cover: string;
	}>;
	icaoId: string;
	maxT24: number | null;
	minT24: number | null;
	pcp3hr: number | null;
	pcp6hr: number | null;
	precip: number | null;
	obsTime: number;
	pcp24hr: number | null;
	qcField: number;
	vertVis: number | null;
	metar_id: number;
	presTend: number | null;
	wxString: string;
	metarType: string;
	mostRecent: number;
	reportTime: string;
	receiptTime: string;
}

export interface TafData {
	tafId: number;
	icaoId: string;
	rawTAF: string;
	lat: number;
	lon: number;
	elev: number;
	name: string;
	fcsts: Array<{
		timeGroup: number;
		timeFrom: number;
		timeTo: number;
		fcstChange: string | null;
		probability: number | null;
		wdir: string | number;
		wspd: number;
		wgst: number | null;
		visib: string;
		clouds: Array<{
			cover: string;
			base: number | null;
			type: string | null;
		}>;
	}>;
}

export interface ToolCallResult {
	coord?: {
		lon: number;
		lat: number;
	};
	weather?: Array<{
		id: number;
		main: string;
		description: string;
		icon: string;
	}>;
	main?: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level?: number;
		grnd_level?: number;
	};
	wind?: {
		speed: number;
		deg: number;
	};
	clouds?: {
		all: number;
	};
	visibility?: number;
	title?: string;
	content?: string;
	nextStep?: string;
	taf?: TafData[];
	metar?: MetarData[];
	[key: string]: unknown;
}

export interface ToolCall {
	state: string;
	toolCallId: string;
	toolName: string;
	args: ToolCallArguments;
	result?: ToolCallResult;
}

export interface EmbeddingResponse {
	source: string;
	response: Array<{
		id: string;
		text: string;
		score: number;
	}>;
}
