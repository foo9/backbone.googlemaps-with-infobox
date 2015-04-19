Backbone.GoogleMaps.InfoBox = Backbone.GoogleMaps.MapView.extend({
    constructor: function() {
        Backbone.GoogleMaps.MapView.prototype.constructor.apply(this, arguments);

        _.bindAll(this, 'render', 'close');

        // Require a related marker instance
        if (!this.options.marker && !this.marker) throw new Error("A marker must be specified for InfoWindow view.");
        this.marker = this.options.marker || this.marker;

        // Set InfoWindow template
        this.template = this.template || this.options.template;
    },

    // Render
    render: function() {
        this.trigger('before:render');
        if (this.beforeRender) {
            this.beforeRender();
        }

        Backbone.GoogleMaps.MapView.prototype.render.apply(this, arguments);

        // Render element
        var tmpl = (this.template) ? $(this.template).html() : '<h2><%=title %></h2>';
        this.$el.html(_.template(tmpl, this.model.toJSON()));

        // Create InfoBox
        this.gOverlay = new InfoBox(_.extend({
            content: this.$el[0]
        }, this.overlayOptions));

        // Display InfoWindow on map
        this.gOverlay.open(this.map, this.marker);

        this.trigger('render');
        if (this.onRender) {
            this.onRender();
        }

        return this;
    },

    // Close and delete window, and clean up view
    close: function() {
        this.trigger('before:close');
        if (this.beforeClose) {
            this.beforeClose();
        }

        Backbone.GoogleMaps.MapView.prototype.close.apply(this, arguments);

        this.trigger('close');
        if (this.onClose) {
            this.onClose();
        }

        return this;
    }
});
