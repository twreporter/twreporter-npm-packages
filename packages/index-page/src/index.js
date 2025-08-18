import { TEN_YEAR_ANNIVERSARY } from '@twreporter/core/lib/constants/feature-flag'

import CategorySection from './components/category-section'
import DonationBoxSection from './components/donation-box-section'
import EditorPicks from './components/editor-picks'
import InforgraphicSection from './components/infographic-section'
import JuniorBoxSection from './components/junior-box-section'
import LatestSection from './components/latest-section'
import LatestTopicSection from './components/latest-topic'
import PhotographySection from './components/photography-section'
import PodcastBoxSection from './components/podcast-box-section'
import ReviewsSection from './components/reviews'
import ScrollFadein from './components/animations/scroll-fadein'
import TopicsSection from './components/topics-section'
import NewDonationBoxSection from './components/new-donation-box-section'

export default {
  components: {
    CategorySection,
    DonationBoxSection: TEN_YEAR_ANNIVERSARY
      ? NewDonationBoxSection
      : DonationBoxSection,
    EditorPicks,
    InforgraphicSection,
    JuniorBoxSection,
    LatestSection,
    LatestTopicSection,
    PhotographySection,
    PodcastBoxSection,
    ReviewsSection,
    ScrollFadein,
    TopicsSection,
  },
}
