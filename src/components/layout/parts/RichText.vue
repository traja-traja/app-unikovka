<template>
    <div v-html="txtHtml"></div>
</template>

<script>
import bbCodeParser from 'js-bbcode-parser';

// avoid XSS
function escapeText(text) {
    const tagsToReplace = {
        '<': '&lt;',
        '>': '&gt;'
    }
    return text.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag
    })
}

export default {
    props: {
        txt: String
    },

    computed: {
        txtHtml() {
            return bbCodeParser.parse(
                escapeText(this.txt)
            )
        }
    }
}
</script>