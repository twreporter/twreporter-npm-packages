import CategorySection from './components/category-section'
import DonationBoxSection from './components/donation-box-section'
import EditorPicksNew from './components/editor-picks'
import EditorPicksOld from './components/editor-picks-old'
import InforgraphicSection from './components/infographic-section'
import JuniorBoxSection from './components/junior-box-section'
import LatestSectionNew from './components/latest-section'
import LatestSectionOld from './components/latest-section-old'
import LatestTopicSection from './components/latest-topic'
import NewsLetterSection from './components/news-letter-section'
import PhotographySection from './components/photography-section'
import PodcastBoxSection from './components/podcast-box-section'
import ReviewsSection from './components/reviews'
import ScrollFadein from './components/animations/scroll-fadein'
import SeachBox from './components/search-box'
import TopicsSection from './components/topics-section'
// feature toggle
import { ENABLE_NEW_INFO_ARCH } from '@twreporter/core/lib/constants/feature-flag'
const LatestSection = ENABLE_NEW_INFO_ARCH ? LatestSectionNew : LatestSectionOld
const EditorPicks = ENABLE_NEW_INFO_ARCH ? EditorPicksNew : EditorPicksOld

export default {
  components: {
    CategorySection,
    DonationBoxSection,
    EditorPicks,
    InforgraphicSection,
    JuniorBoxSection,
    LatestSection,
    LatestTopicSection,
    NewsLetterSection,
    PhotographySection,
    PodcastBoxSection,
    ReviewsSection,
    ScrollFadein,
    SeachBox,
    TopicsSection,
  },
}
