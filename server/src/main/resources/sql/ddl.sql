CREATE TABLE post
(
    id              INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    writer_id       INT(11) UNSIGNED NOT NULL,
    title           VARCHAR(255) NOT NULL,
    content         MEDIUMTEXT   NOT NULL,
    thumbnail_image VARCHAR(255) NULL,
    is_public       BIT          NOT NULL,
    view_count      BIGINT       NOT NULL,
    like_count      BIGINT       NOT NULL,
    created_at      DATETIME     NOT NULL,
    modified_at     DATETIME     NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE chat_room
(
    id          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    created_at  DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE member
(
    id                     INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    email                  VARCHAR(255) NOT NULL,
    nickname               VARCHAR(255) NOT NULL,
    password               VARCHAR(255) NULL,
    profile_image          VARCHAR(255) NULL,
    header_image           VARCHAR(255) NULL,
    phone_number           VARCHAR(255) NULL,
    user_description       VARCHAR(255) NULL,
    recipient_name         VARCHAR(255) NULL,
    recipient_phone_number VARCHAR(255) NULL,
    zipcode                VARCHAR(255) NULL,
    street_address         VARCHAR(255) NULL,
    detail_address         VARCHAR(255) NULL,
    account_holder         VARCHAR(255) NULL,
    account_bank           VARCHAR(255) NULL,
    account_number         VARCHAR(255) NULL,
    follower_count         INTEGER      NOT NULL,
    following_count        INTEGER      NOT NULL,
    today_views            INTEGER      NOT NULL,
    total_views            INTEGER      NOT NULL,
    dm_recieve             BIT          NOT NULL,
    authority              VARCHAR(255) NOT NULL,
    status                 VARCHAR(255) NOT NULL,
    created_at             DATETIME     NOT NULL,
    modified_at            DATETIME     NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE follow
(
    id           INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    follower_id  INT(11) UNSIGNED NOT NULL,
    following_id INT(11) UNSIGNED NOT NULL,
    created_at   DATETIME NOT NULL,
    modified_at  DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE chat_user
(
    id           INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    member_id    INT(11) UNSIGNED NOT NULL,
    chat_room_id INT(11) UNSIGNED NOT NULL,
    created_at   DATETIME NOT NULL,
    modified_at  DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE chat_message
(
    id           INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    chat_user_id INT(11) UNSIGNED NOT NULL,
    content      VARCHAR(255) NULL,
    image        VARCHAR(255) NULL,
    modified     BIT          NOT NULL,
    created_at   DATETIME     NOT NULL,
    modified_at  DATETIME     NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE post_like
(
    id          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    member_id   INT(11) UNSIGNED NOT NULL,
    post_id     INT(11) UNSIGNED NOT NULL,
    created_at  DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE post_comment
(
    id          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    writer_id   INT(11) UNSIGNED NOT NULL,
    post_id     INT(11) UNSIGNED NOT NULL,
    content     MEDIUMTEXT NOT NULL,
    created_at  DATETIME   NOT NULL,
    modified_at DATETIME   NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tag
(
    id      INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    content VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE post_tag
(
    id      INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    post_id INT(11) UNSIGNED NOT NULL,
    tag_id  INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE sale
(
    id                      INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    writer_id               INT(11) UNSIGNED NOT NULL,
    title                   INT(11) UNSIGNED NOT NULL,
    content                 MEDIUMTEXT   NOT NULL,
    thumbnail_image         VARCHAR(255) NULL,
    view_count              BIGINT       NOT NULL,
    like_count              BIGINT       NOT NULL,
    refund_exchange_policy  MEDIUMTEXT   NOT NULL,
    started_at              DATETIME     NOT NULL,
    end_at                  DATETIME     NOT NULL,
    account_holder          VARCHAR(255) NOT NULL,
    account_bank            VARCHAR(255) NOT NULL,
    account_number          VARCHAR(255) NOT NULL,
    caution                 MEDIUMTEXT   NULL,
    production_process_link VARCHAR(255) NULL,
    delivery_time           DATETIME     NULL,
    delivery_company        VARCHAR(255) NULL,
    delivery_price          INTEGER      NULL,
    deposit_effective_time  TINYINT      NULL,
    is_always_on_sale       BIT          NULL,
    created_at              DATETIME     NOT NULL,
    modified_at             DATEITME     NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE product
(
    id             INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    sale_id        INT(11) UNSIGNED NOT NULL,
    name           VARCHAR(255) NOT NULL,
    image_url      VARCHAR(255) NOT NULL,
    price          INTEGER      NOT NULL,
    stock_quantity TINYINT      NOT NULL,
    created_at     DATETIME     NOT NULL,
    modified_at    DATETIME     NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE orders
(
    id             INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    member_id      INT(11) UNSIGNED NOT NULL,
    status         VARCHAR(255) NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    account_bank   VARCHAR(255) NULL,
    account_number VARCHAR(255) NULL,
    created_at     DATETIME     NOT NULL,
    modified_at    DATETIME     NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE order_item
(
    id          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    order_id    INT(11) UNSIGNED NOT NULL,
    product_id  INT(11) UNSIGNED NOT NULL,
    order_price INTEGER NOT NULL,
    count       TINYINT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE sale_like
(
    id          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    member_id   INT(11) UNSIGNED NOT NULL,
    sale_id     INT(11) UNSIGNED NOT NULL,
    created_at  DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE sale_tag
(
    id      INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    sale_id INT(11) UNSIGNED NOT NULL,
    tag_id  INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE notification
(
    id              INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    receiver_id     INT(11) UNSIGNED NOT NULL,
    sender_nickname VARCHAR(255) NOT NULL,
    type            VARCHAR(255) NOT NULL,
    article_id      BIGINT       NOT NULL,
    title           VARCHAR(255) NOT NULL,
    checked         BIT          NOT NULL,
    created_at      DATETIME     NOT NULL,
    modified_at     DATETIME     NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE post
    ADD FOREIGN KEY (writer_id) REFERENCES member (id) ON DELETE SET NULL;

ALTER TABLE follow
    ADD FOREIGN KEY (follower_id) REFERENCES member (id) ON DELETE CASCADE;

ALTER TABLE follow
    ADD FOREIGN KEY (following_id) REFERENCES member (id) ON DELETE CASCADE;

ALTER TABLE chat_user
    ADD FOREIGN KEY (member_id) REFERENCES member (id) ON DELETE SET NULL;

ALTER TABLE chat_user
    ADD FOREIGN KEY (chat_room_id) REFERENCES chat_room (id) ON DELETE CASCADE;

ALTER TABLE chat_message
    ADD FOREIGN KEY (chat_user_id) REFERENCES chat_user (id) ON DELETE CASCADE;

ALTER TABLE post_like
    ADD FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE;

ALTER TABLE post_like
    ADD FOREIGN KEY (member_id) REFERENCES member (id) ON DELETE CASCADE;

ALTER TABLE post_comment
    ADD FOREIGN KEY (writer_id) REFERENCES member (id) ON DELETE SET NULL;

ALTER TABLE post_comment
    ADD FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE SET NULL;

ALTER TABLE post_tag
    ADD FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE;

ALTER TABLE post_tag
    ADD FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE;

ALTER TABLE sale
    ADD FOREIGN KEY (writer_id) REFERENCES member (id) ON DELETE SET NULL;

ALTER TABLE product
    ADD FOREIGN KEY (sale_id) REFERENCES sale (id) ON DELETE CASCADE;

ALTER TABLE orders
    ADD FOREIGN KEY (member_id) REFERENCES member (id) ON DELETE SET NULL;

ALTER TABLE order_item
    ADD FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE;

ALTER TABLE order_item
    ADD FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE SET NULL;

ALTER TABLE sale_like
    ADD FOREIGN KEY (member_id) REFERENCES member (id) ON DELETE CASCADE;

ALTER TABLE sale_like
    ADD FOREIGN KEY (sale_id) REFERENCES sale (id) ON DELETE CASCADE;

ALTER TABLE sale_tag
    ADD FOREIGN KEY (sale_id) REFERENCES sale (id) ON DELETE CASCADE;

ALTER TABLE sale_tag
    ADD FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE;

ALTER TABLE notification
    ADD FOREIGN KEY (receiver_id) REFERENCES member (id) ON DELETE CASCADE;
