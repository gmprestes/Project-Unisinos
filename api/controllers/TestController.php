<?php


class TestController
{
  public $key = '#ovelha#@fresca#';
  public $method = 'aes-128-cbc';

  /**
   * Returns an encrypted & utf8-encoded
   */
  public function encrypt($pure_string) {
      $safestring = base64_encode($pure_string);

      return openssl_encrypt($safestring, $this->method, $this->key,false,$this->key);
  }

  /**
   * Returns decrypted original string
   */
  private function decrypt($encrypted_string) {
      $base64string = openssl_decrypt($encrypted_string, $this->method, $this->key,false,$this->key);
      //return $base64string;
      return base64_decode($base64string);
  }
    /**
     * @url GET /
     */
    public function test()
    {
        return "Home method";
    }

    /**
     * @url GET /banana/
     */
    public function banana()
    {
        return "banana";
    }

    /**
     * @url GET /buscardisciplinas/$user/$pass
     */
    public function buscardisciplinas($user,$pass)
    {
      $passString =  $this->decrypt($pass);

      //$answer = shell_exec('phantomjs.exe --ssl-protocol=any uni.js ' . $user . ' ' . $passString . ' heheasp');
      //if(count(explode("\n",$answer)) > 4)
        //return "ERRO";
      //else {

        $file = file_get_contents("html/heheasp.html");
        $pattern = '/<div id=\"divQuadroHorario\"([\w\W]*?)<\/div>/';
        preg_match($pattern, $file, $matches);
        $div = $matches[0];

        $pattern = '/<table([\w\W]*?)<\/table>/';
        preg_match($pattern, $div, $matches);
        $table = $matches[0];
        //return $table;
        $pattern = '/<tr([\w\W]*?)<\/tr>/'; //';
        preg_match_all($pattern, $table,$matches);
        $trs = $matches[0];

        return "OK";
      //}
    }

    /**
     * @url GET /users/$id
     * @url GET /users/current
     */
    public function getUser($id = null)
    {
        return array("id" => $id, "name" => null);
    }
}

?>
