import spacy

nlp = spacy.load("en_core_web_sm")

from spacy_langdetect import LanguageDetector
from spacy.language import Language


@Language.factory('language_detector')
def language_detector(nlp, name):
    return LanguageDetector()

nlp.add_pipe("language_detector", last=True)

# excluded categories include: pronouns, determinates (the, a), punctuation, and whatever ADT is
lExclude = ['PRON', 'DET', 'PUNCT']
REMOVE_TAGS = ['FW']
remove_words = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself",
                "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself",
                "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that",
                "these",
                "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do",
                "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while",
                "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before",
                "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under",
                "again",
                "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each",
                "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than",
                "too", "very", "s", "t", "can", "will", "just", "don", "should", "now", "level", "game", "platform",
                "designer", "developer", "games", "platforms", "designers", "program", "map", "maps", "confused", "looking"]


def cleanComment(comment):
    newComment = ""
    doc = nlp(comment)

    # remove non english sentances rather than attempting to translate them
    if doc._.language['language'] != 'en':
        return False

    for token in doc:

        # remove decided lexical categories to exclode, as well as 500 most common words
        if token.pos_ in lExclude or token.tag_ in REMOVE_TAGS or token.is_stop or token.is_space or token.text in remove_words:
            continue

        # turn token into its base form (although makes it no longer an nlp token and just a string)
        token = token.lemma_

        newComment += token+" "

    return newComment # returns string

print(cleanComment("i'm looking to create a MERN stack desktop app"))
