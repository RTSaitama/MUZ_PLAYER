"use strict";
exports.__esModule = true;
exports.Playlists = void 0;
var framer_motion_1 = require("framer-motion");
var playlistsApi_1 = require("../../store/apis/playlistsApi");
exports.Playlists = function () {
    var playlists = playlistsApi_1.useGetPlaylistsQuery().data;
    var containerVar = {
        hidden: { opacity: 0.1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        },
        exit: { opacity: 0, transition: { staggerChildren: 0.05, duration: 0.5 } }
    };
    var itemVar = {
        hidden: { opacity: 0.1 },
        visible: { opacity: 1, transition: { duration: 1 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.7 } }
    };
    console.log(playlists);
    return (React.createElement(framer_motion_1.motion.ul, { key: "results", variants: containerVar, initial: "hidden", animate: "visible", exit: "exit", className: "search__results__screen playlists_screen" }, playlists === null || playlists === void 0 ? void 0 : playlists.map(function (playlist) {
        var _a;
        return (React.createElement(framer_motion_1.motion.li, { variants: itemVar, key: playlist.id, className: "search__results__item playlist_item" }, ((_a = playlist.tracks) === null || _a === void 0 ? void 0 : _a.length) > 0 && React.createElement("img", { className: 'playlist_img', src: playlist.tracks[0].image, alt: "first track of playlist image" })));
    })));
};
