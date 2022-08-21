import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import homeAR from "./ar/home.json";
import navBarAR from "./ar/navBar.json";
import faqAR from "./ar/faq.json";
import creatorsAR from "./ar/creators.json";
import bundlesAR from "./ar/bundles.json";
import loginAR from "./ar/login.json";
import profileAR from "./ar/profile.json";
import feedAR from "./ar/feed.json";
import nftAR from "./ar/feed.json";
import bidsAR from "./ar/bids.json";
import usersAR from "./ar/users.json";
import metaverseAR from "./ar/metaverse.json";
import footerAR from "./ar/footer.json";
import howItWorkAR from "./ar/howItWork.json";
import tapsAR from "./ar/taps.json";
import noDataFoundAR from "./ar/noDataFound.json";
import chatAR from "./ar/chat.json";
import bidNFTAR from "./ar/bidNFT.json";
import homeEN from "./en/home.json";
import navBarEN from "./en/navBar.json";
import faqEN from "./en/faq.json";
import creatorsEN from "./en/creators.json";
import bundlesEN from "./en/bundles.json";
import loginEN from "./en/login.json";
import profileEN from "./en/profile.json";
import feedEN from "./en/feed.json";
import nftEN from "./en/nft.json";
import bidsEN from "./en/bids.json";
import usersEN from "./en/users.json";
import metaverseEN from "./en/metaverse.json";
import footerEN from "./en/footer.json";
import howItWorkEN from "./en/howItWork.json";
import tapsEN from "./en/taps.json";
import noDataFoundEN from "./en/noDataFound.json";
import chatEN from "./en/chat.json";
import bidNFTEN from "./en/bidNFT.json";


const resources = {
    en: {
        translation: {
            navBar: navBarEN,
            users: usersEN,
            header: homeEN,
            faq: faqEN,
            creators: creatorsEN,
            bundles: bundlesEN,
            login: loginEN,
            profile: profileEN,
            feed: feedEN,
            nft: nftEN,
            bids: bidsEN,
            metaverse: metaverseEN,
            footer: footerEN,
            howItWork: howItWorkEN,
            taps: tapsEN,
            noDataFound: noDataFoundEN,
            chat: chatEN,
            bidNFT: bidNFTEN

        },
    },
    ar: {
        translation: {
            navBar: navBarAR,
            users: usersAR,
            header: homeAR,
            faq: faqAR,
            creators: creatorsAR,
            bundles: bundlesAR,
            login: loginAR,
            profile: profileAR,
            feed: feedAR,
            nft: nftAR,
            bids: bidsAR,
            metaverse: metaverseAR,
            footer: footerAR,
            howItWork: howItWorkAR,
            taps: tapsAR,
            noDataFound: noDataFoundAR,
            chat: chatAR,
            bidNFT: bidNFTAR

        },
    },
}
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        supportedLngs: ["en", "ar"],
        fallbackLng: "en",
        detection: {
            order: ["cookie", "localStorage", "htmlTag", "path", "subdomain"],
            caches: ["cookie", "localStorage"],
        },
        react: { useSuspens: false },
    });

export default i18n;
