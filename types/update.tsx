export interface Update {
	_id: string;
	title: string;
	slug: {
		current: string;
	};
	excerpt: string;
	publishedAt: string;
	mainImage: {
		asset: {
			_id: string;
			url: string;
		};
	};
	categories: Array<{
		title: string;
	}>;
}
