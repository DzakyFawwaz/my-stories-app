import {
  generateLoaderAbsoluteTemplate,
  generateReportItemTemplate,
  generateReportsListEmptyTemplate,
  generateReportsListErrorTemplate,
} from '../../templates';
import HomePresenter from './home-presenter';
import * as CityCareAPI from '../../data/api';

export default class HomePage {
  #presenter = null;

  async render() {
    return `
      <section>
        <div class="reports-list__map__container">
          <div id="map" class="reports-list__map"></div>
          <div id="map-loading-container"></div>
        </div>
      </section>

      <section class="container">
        <h1 class="section-title">Daftar Laporan Kerusakan</h1>

        <div class="reports-list__container">
          <div id="sstories-list"></div>
          <div id="sstories-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: CityCareAPI,
    });

    await this.#presenter.initialGalleryAndMap();
  }

  populateStoriesList(message, stories) {
    if (stories.length <= 0) {
      this.populateReportsListEmpty();
      return;
    }

    const html = stories.reduce((accumulator, story) => {
      return accumulator.concat(
        generateReportItemTemplate({
          ...story,
          storyName: story.name,
        }),
      );
    }, '');

    document.getElementById('sstories-list').innerHTML = `
      <div class="sstories-list">${html}</div>
    `;
  }

  populateReportsListEmpty() {
    document.getElementById('sstories-list').innerHTML = generateReportsListEmptyTemplate();
  }

  populateStoriesListError(message) {
    document.getElementById('sstories-list').innerHTML = generateReportsListErrorTemplate(message);
  }

  async initialMap() {
    // TODO: map initialization
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }

  showLoading() {
    document.getElementById('sstories-list-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('sstories-list-loading-container').innerHTML = '';
  }
}
