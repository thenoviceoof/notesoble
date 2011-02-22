/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

[ ]                   return 'SPACE'
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1;}
    ;

e
    : 'SPACE'
        {$$ = 1;}
    | e 'SPACE'
        {$$ = $1 + 1;}
    ;
