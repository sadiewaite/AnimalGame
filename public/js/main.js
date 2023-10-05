import("./router.js").then(router => {
    window.addEventListener("hashchange", router.useRouter);
    window.addEventListener("load", router.useRouter);
});

