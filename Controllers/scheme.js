const Scheme = require("../Models/scheme");

const add = async (req, res) => {
    try {
        const scheme = await Scheme.create(req.body);

        return res.json({
            status: "ok",
            message: "Scheme added successfully",
            _id: scheme.id,
            title: scheme.title,
            description: scheme.description,
            category: scheme.category,
            minIncome: scheme.minIncome,
            maxIncome: scheme.maxIncome,
            mode: scheme.mode,
            list: scheme.list,
            state: scheme.state,
        });
    } catch (error) {
        return res.json({
            status: "error",
            error: "Some error occurred",
        });
    }
};

const update = async (req, res) => {
    const { schemeId } = req.body;

    try {
        const scheme = await Scheme.findById(schemeId);

        if (scheme) {
            await scheme.updateOne(req.body);

            return res.json({
                status: "ok",
                message: "Scheme updated successfully",
            });
        } else {
            return res.json({
                status: "ok",
                message: "Scheme not found",
            });
        }
    } catch (error) {
        return res.json({ status: "error", error: "Some error occurred" });
    }
};

const deleteScheme = async (req, res) => {
    const { schemeId } = req.body;

    try {
        const scheme = await Scheme.findById(schemeId);

        if (scheme) {
            await scheme.remove();

            return res.json({
                status: "ok",
                message: "Scheme deleted successfully",
            });
        } else {
            return res.json({
                status: "ok",
                message: "Scheme not found",
            });
        }
    } catch (error) {
        return res.json({ status: "error", error: "Some error occurred" });
    }
};

const get = async (req, res) => {
    const { schemeId } = req.body;

    try {
        const scheme = await Scheme.findById(schemeId);

        if (scheme) {
            return res.json({
                status: "ok",
                _id: scheme.id,
                title: scheme.title,
                description: scheme.description,
                category: scheme.category,
                minIncome: scheme.minIncome,
                maxIncome: scheme.maxIncome,
                mode: scheme.mode,
                list: scheme.list,
                state: scheme.state,
            });
        } else {
            return res.json({ status: "error", error: "Scheme not found" });
        }
    } catch (error) {
        return res.json({
            status: "error",
            error: "Some error occurred",
        });
    }
};

const getAll = async (req, res) => {
    const { category, state } = req.body;

    try {
        var schemes = [];

        if (category && state) {
            schemes = await Scheme.find({ category, state });
        } else if (category) {
            schemes = await Scheme.find({ category });
        } else if (state) {
            schemes = await Scheme.find({ state });
        } else {
            schemes = await Scheme.find({});
        }

        return res.json({ status: "ok", response: schemes });
    } catch (error) {
        return res.json({
            status: "error",
            error: "Some error occurred",
        });
    }
};

module.exports = {
    add,
    update,
    deleteScheme,
    get,
    getAll,
};
