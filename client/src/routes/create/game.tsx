import { LinksFunction } from "remix";

// Components
import Input from "~/components/form/Input";

// Css
import formCss from "~/css/pages/auth/form.css";
import gameCss from "~/css/pages/create/game.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: formCss },
        { rel: "stylesheet", href: gameCss }
    ]
}

const CreateGame = () => {
    return (
        <div className="iw_createGame">
            <h1>Create a Game</h1>

            <form className="iw_form">
                <Input
                    className="mb-8"
                    labelTitle="Word"
                    name="word"
                    placeholder="ex. Laptop"
                />

                <Input
                    className="mb-8"
                    labelTitle="Trys"
                    name="trys"
                    placeholder="ex. 5"
                />

                <Input
                    type="textarea"
                    labelTitle="Description (optional)"
                    name="description"
                    placeholder="Some description from your word"
                />

            </form>
        </div>
    )

};

export default CreateGame;