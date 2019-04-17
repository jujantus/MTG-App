import { BehaviorSubject } from 'rxjs';

class EventsHub {
	quickSearch;

	constructor() {
		this.quickSearchSubject = new BehaviorSubject(null);
	}

	setQuickSearch(quickSearch) {
		this.quickSearchSubject.next(quickSearch);
	}

	onQuickSearchChanged() {
		return this.quickSearchSubject.asObservable();
	}
}

const eventsHub = new EventsHub();

export default eventsHub;
