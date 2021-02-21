<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="./assets/Discord-Logo-White.svg"
              transition="scale-transition"
              width="40"
          />
        </router-link>

        <!-- <v-img
             alt="Vuetify Name"
             class="shrink mt-1 hidden-sm-and-down"
             contain
             min-width="100"
             src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
             width="100"
         /> -->
      </div>

      <v-spacer></v-spacer>
      <v-btn v-if="botLogged" @click="$store.dispatch('bot/logout')">
        Выйти
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view v-if="botLogged"/>
        <template v-else-if="status">
          <v-progress-linear color="error" absolute top indeterminate/>
        </template>
        <template v-else>
          <v-form
              ref="form"
              lazy-validation>
            <v-text-field filled v-model="form.token" label="Токен"/>
            <v-btn color="success" @click="login" class="mr-4">Вход</v-btn>
          </v-form>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import {getUser, getChannel} from "./bot";

export default {
  name: 'App',
  data: () => ({
    currentServer: 0,
    form: {
      token: ''
    },
    token: ''
  }),
  computed: {
    ...mapGetters(['client',
      'guild', 'guilds',
      'channel', 'channels',
      'messages',
      'botLogged', 'status'])
  },
  mounted() {
    if (localStorage.token) {
      this.$store.dispatch('bot/setStatus', true);
      this.$store.dispatch('bot/init', localStorage.token)
    } else {
      this.$store.dispatch('bot/setStatus', false);
    }
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop
    },
    replaceMarkdown(text, markdown, start, end, join) {
      if (text === "" || !text.includes(markdown)) {
        return text;
      } else {
        let content = text.split(markdown);
        if (content.length > 2) {
          for (let i = 0; i < content.length; i++) {
            if (i !== 0 && i % 2 !== 0 && content[i] !== "") {
              content[i] = start + content[i] + end;
            } else if (i !== 0 && i % 2 !== 0 && content[i] === "") {
              content[i] = join + join;
            }
          }
          return content.join("");
        } else {
          return content.join(join);
        }

      }
    },
    escapeHtml(text) {
      return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
    },
    embedLinks(element) {
      let html = "<div>";
      if (element.iconURL) {
        html += `<a href="${element.iconURL}" target="_blank"><img class="avatarIMG" src="${element.iconURL}" alt=""></a>`;
      }
      if (element.url) {
        html += `<a href="${element.url}">${element.name || element.text}</a>`;
      } else {
        html += element.name || element.text;
      }
      html += "</div>";
      return html;
    },
    createMessage(message) {
      let html;
      let attachments = [];
      let embeds = [];
      let links = [];

      Array.from(message.attachments).forEach((attachment) => {
        let attachmentUrl = attachment[1].url;
        let attachmentTxt = `<a href="${this.escapeHtml(attachmentUrl)}" target="_blank">`;
        if (attachmentUrl.endsWith(".jpg") || attachmentUrl.endsWith(".jpeg") || attachmentUrl.endsWith(".png")) {
          return embeds.push(`<div><a href="${attachmentUrl}" target="_blank"><img style="max-width: 100%;max-height: 300px;object-fit: scale-down;margin: 5px 0 0 0" src="${attachmentUrl}" alt=""></a></div>`);
        } else if (attachmentUrl.endsWith(".mp4")) {
          return embeds.push(`<div><figure><figcaption>${attachment[1].name}</figcaption><video controls src="${attachmentUrl}"></video></figure></div>`);
        } else if (attachmentUrl.endsWith(".mp3")) {
          return embeds.push(`<div><figure><figcaption>${attachment[1].name}</figcaption><audio controls src="${attachmentUrl}"></audio></figure></div>`);
        } else if (attachmentUrl.endsWith(".docx") || attachmentUrl.endsWith(".odt")) {
          attachmentTxt += 'doc';
        } else if (attachmentUrl.endsWith(".pdf")) {
          attachmentTxt += 'pdf';
        } else {
          attachmentTxt += 'unknown';
        }
        attachmentTxt += "</a>";
        attachments.push(attachmentTxt);
      });

      if (message.embeds.length) {
        let embed = message.embeds[0];
        let images = [];
        let fields = [];
        let html = `<div class="embed" ${embed.hexColor ? `style="border-left: 5px solid ${embed.hexColor}"` : ""}>`;
        if (embed.url) {
          links.push(embed.url);
        }

        if (embed.image) {
          let length = message.embeds.length;
          for (let i = 0; i < message.embeds.length; i++) {
            let style = "padding: 2px;";
            let image = message.embeds[i].image;
            if (length === 1) {
              style += "border-radius: 8px;width: 100%;height:300px;object-fit: scale-down;";
            } else if (length === 2) {
              if (i === 0) {
                style += "border-radius: 8px 0 0 8px;width: 50%;height:300px;object-fit: cover;";
              } else {
                style += "border-radius: 0 8px 8px 0;width: 50%;height:300px;object-fit: cover;";
              }
            } else if (length === 3) {
              if (i === 0) {
                style += "border-radius: 8px 0 0 8px;width: 50%;height:300px;object-fit: cover;float: left;";
              } else if (i === 1) {
                style += "border-radius: 0 8px 0 0;width: 50%;height:150px;object-fit: cover;vertical-align: top;float: right;";
              } else {
                style += "border-radius: 0 0 8px 0;width: 50%;height:150px;object-fit: cover;vertical-align: top;float: right;";
              }
            } else {
              if (i === 0) {
                style += "border-radius: 8px 0 0 0;width: 50%;height:150px;object-fit: cover;";
              }
              if (i === 1) {
                style += "border-radius:  0 8px 0 0;width: 50%;height:150px;object-fit: cover;";
              }
              if (i === 2) {
                style += "border-radius:  0 0 0 8px;width: 50%;height:150px;object-fit: cover;";
              }
              if (i === 3) {
                style += "border-radius:  0 0 8px 0;width: 50%;height:150px;object-fit: cover;";
              }
            }

            images.push(`<a href="${image.url}" target="_blank"><img style="${style}" src="${image.url}" alt=""></a>`);
          }
        }

        if (embed.author) {
          html += this.embedLinks(embed.author);
        }

        if (embed.title) {
          html += `<div><b>${embed.title}</b></div>`;
        }

        if (embed.description) {
          html += `<div style="word-break: break-word;">${this.formatMessage(embed.description)}</div>`;
        }

        if (embed.fields.length > 0) {
          html += "<div>";
          embed.fields.forEach((field) => {
            if (field.inline) {
              fields.push(`<span style="display: inline-block;min-width: 50%;word-break: break-word;"><b>${field.name}</b><br>${this.formatMessage(field.value)}</span>`);
            } else {
              fields.push(`<div><b>${field.name}</b><br>${this.formatMessage(field.value)}</div>`);
            }
          });
          html += `${fields.join('')}</div>`;
        }

        if (embed.video !== null) {
          html += `<div><video controls src="${embed.video.url}"></video></div>`;
        } else if (images.length) {
          html += `<div>${images.join('')}</div>`;
        } else if (embed.thumbnail !== null) {
          // bhtml += `<div><a href="${embed.thumbnail.url}" target="_blank"><img style="border-radius: 8px;width: 100%;height:300px;object-fit: cover;" src="${embed.thumbnail.url}" alt=""></a></div>`;
        }

        if (embed.footer) {
          html += this.embedLinks(embed.footer);
        }
        html += "</div>";
        embeds.push(html);
      }
      html = `<div class="chatMsg" id="${message.id}">`;

      // Different types of messages
      if (message.type === "GUILD_MEMBER_JOIN") {
        html += `ServerJoin`;
      } else if (message.type === "PINS_ADD") {
        html += `pin`;
      } else if (message.type === "CHANNEL_FOLLOW_ADD") {
        html += `Новости`;
      } else if (message.type.includes("USER_PREMIUM_GUILD_SUBSCRIPTION")) {
        html += `Boost`; // Covers all levels of boosting
      } else if (message.content === "" && attachments.length > 0) {
        html += `FileSent`;
      }

      html += "</div>";

      html += `<div class="messageContent">${message.content ? this.formatMessage(message.content, links) : ""}</div>`;

      if (embeds.length) {
        html += `${embeds.join("")}`;
      }

      if (attachments.length) {
        html += `<div>Text : ${attachments.join(', ')}</div>`;
      }

      return `${html}</div>`;
    },
    formatMessage(content) {
      // no-useless-escape
      content = this.escapeHtml(content)
          .replace(/\n/g, "<br>")
          .replace(/(&lt;a:(.*?):(\d{18})&gt;)/g, `<img title="$2" alt="" class="smallEmojiImg" src="https://cdn.discordapp.com/emojis/$3" onclick="addText('$1')">`)
          .replace(/(&lt;:(.*?):(\d{18})&gt;)/g, `<img title="$2" alt="" class="smallEmojiImg" src="https://cdn.discordapp.com/emojis/$3" onclick="addText('$1')">`)
          .replace(/\[(.*)]\((.*)\)/g, `<a href="$2" target="_blank">$1</a>`);

      [...content.matchAll(/&lt;@(!|)(\d{18})&gt;/g)].forEach((match) => {
        content = content.replace(match[0], `@${getUser(match[2])}`)
      });

      [...content.matchAll(/&lt;#(\d{18})&gt;/g)].forEach((match) => {
        content = content.replace(match[0], `#${getChannel(match[1])}`)
      });

      content = this.replaceMarkdown(content, "***", "<b><em>", "</em></b>", "***");
      content = this.replaceMarkdown(content, "**", "<b>", "</b>", "&ast;&ast;");
      content = this.replaceMarkdown(content, "*", "<em>", "</em>", "&ast;");
      content = this.replaceMarkdown(content, "__", "<u>", "</u>", "&lowbar;&lowbar;");
      content = this.replaceMarkdown(content, "~~", "<s>", "</s>", "&tilde;&tilde;");
      content = this.replaceMarkdown(content, "```", "<div class='codeBlock'>", "</div>", "```");
      content = this.replaceMarkdown(content, "`", "<div class='code'>", "</div>", "&grave;");
      return content;
    },
    deleteMessage(id) {
      this.$store.dispatch('bot/delMessage', id)
    },
    onChangeChannel(item) {
      this.$store.dispatch('bot/setChannel', item)
    },
    onChangeServer(item) {
      this.$store.dispatch('bot/setGuild', item)
    },
    destroy() {
      this.$store.dispatch('bot/logout')
    },
    login() {
      this.$store.dispatch('bot/init', this.form.token)
    }
  },
  created() {

  }
};
</script>
