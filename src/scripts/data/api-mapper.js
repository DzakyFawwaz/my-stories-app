import Map from '../utils/map';

export async function storyMapper(story) {
  console.log({ story });
  return {
    ...story,
    location: {
      ...story,
      placeName: await Map.getPlaceNameByCoordinate(story.lat, story.lon),
    },
  };
}
