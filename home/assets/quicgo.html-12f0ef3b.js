import{_ as n,o as s,c as a,a as e}from"./app-0a114cce.js";const t="/home/assets/san-d7800022.png",p="/home/assets/server-e2b753ce.png",o="/home/assets/client-2cc58d6d.png",i={},l=e(`<h1 id="go-http3实践" tabindex="-1"><a class="header-anchor" href="#go-http3实践" aria-hidden="true">#</a> Go-http3实践</h1><p>使用quic-go库来实现http3的服务端-客户端简单程序。</p><h2 id="本机访问" tabindex="-1"><a class="header-anchor" href="#本机访问" aria-hidden="true">#</a> 本机访问</h2><h3 id="_1-生成私钥" tabindex="-1"><a class="header-anchor" href="#_1-生成私钥" aria-hidden="true">#</a> 1. 生成私钥</h3><p>单独生成 RSA 私钥：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl genrsa <span class="token parameter variable">-out</span> server.key <span class="token number">2048</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>server.key：包含服务端的私钥。</li></ul><h3 id="_2-生成自签名证书-带-san" tabindex="-1"><a class="header-anchor" href="#_2-生成自签名证书-带-san" aria-hidden="true">#</a> 2. 生成自签名证书（带 SAN）</h3><p>使用生成的私钥，创建自签名证书并将 SAN 信息写入证书中：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-new</span> <span class="token parameter variable">-key</span> server.key <span class="token parameter variable">-out</span> server.crt <span class="token parameter variable">-days</span> <span class="token number">365</span> <span class="token parameter variable">-subj</span> <span class="token string">&quot;/CN=localhost&quot;</span> <span class="token parameter variable">-addext</span> <span class="token string">&quot;subjectAltName=DNS:localhost,IP:127.0.0.1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>server.crt：包含服务端的自签名证书，带有 SAN。</li></ul><h3 id="_3-提取公钥证书部分-供客户端使用" tabindex="-1"><a class="header-anchor" href="#_3-提取公钥证书部分-供客户端使用" aria-hidden="true">#</a> 3. 提取公钥证书部分（供客户端使用）</h3><p>复制一份服务端证书的公钥部分到客户端信任的 ca.pem：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cp</span> server.crt ca.pem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>ca.pem：供客户端信任的根证书，与 server.crt 相同，但仅用于客户端。</li></ul><p><strong>文件结构</strong></p><ul><li>server.key：服务端私钥，仅供服务端使用。</li><li>server.crt：服务端证书，服务端加载它作为 TLS 证书。</li><li>ca.pem：客户端信任的根证书，客户端加载以验证服务端证书。</li></ul><p><strong>验证 SAN</strong></p><p>确保证书包含 SAN：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl x509 <span class="token parameter variable">-in</span> server.crt <span class="token parameter variable">-noout</span> <span class="token parameter variable">-text</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-A</span> <span class="token number">1</span> <span class="token string">&quot;Subject Alternative Name&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+t+`" alt="screenshot2024-11-30 17.10.56"></p><h3 id="服务端启动代码" tabindex="-1"><a class="header-anchor" href="#服务端启动代码" aria-hidden="true">#</a> 服务端启动代码</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>

	<span class="token string">&quot;github.com/quic-go/quic-go/http3&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Received request: %s %s&quot;</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>Method<span class="token punctuation">,</span> r<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path<span class="token punctuation">)</span>
		w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;Hello from HTTP/3 server with custom CA!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	server <span class="token operator">:=</span> <span class="token operator">&amp;</span>http3<span class="token punctuation">.</span>Server<span class="token punctuation">{</span>
		Addr<span class="token punctuation">:</span>    <span class="token string">&quot;:4433&quot;</span><span class="token punctuation">,</span>
		Handler<span class="token punctuation">:</span> mux<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Starting HTTP/3 server on :4433&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">ListenAndServeTLS</span><span class="token punctuation">(</span><span class="token string">&quot;server.crt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;server.key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="客户端代码" tabindex="-1"><a class="header-anchor" href="#客户端代码" aria-hidden="true">#</a> 客户端代码</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;crypto/tls&quot;</span>
	<span class="token string">&quot;crypto/x509&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;os&quot;</span>

	<span class="token string">&quot;github.com/quic-go/quic-go/http3&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	caCert<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span><span class="token string">&quot;ca.pem&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Error reading CA certificate: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	caCertPool <span class="token operator">:=</span> x509<span class="token punctuation">.</span><span class="token function">NewCertPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>caCertPool<span class="token punctuation">.</span><span class="token function">AppendCertsFromPEM</span><span class="token punctuation">(</span>caCert<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Failed to add CA certificate to pool&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	tlsConfig <span class="token operator">:=</span> <span class="token operator">&amp;</span>tls<span class="token punctuation">.</span>Config<span class="token punctuation">{</span>
		RootCAs<span class="token punctuation">:</span> caCertPool<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Transport<span class="token punctuation">:</span> <span class="token operator">&amp;</span>http3<span class="token punctuation">.</span>Transport<span class="token punctuation">{</span>
			TLSClientConfig<span class="token punctuation">:</span> tlsConfig<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;https://localhost:4433/&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Error making request: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	body<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> io<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Response: %s&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看" tabindex="-1"><a class="header-anchor" href="#查看" aria-hidden="true">#</a> 查看</h3><p><img src="`+p+'" alt="screenshot2024-11-30 17.11.26"></p><p><img src="'+o+`" alt="screenshot2024-11-30 17.11.41"></p><h2 id="内网环境" tabindex="-1"><a class="header-anchor" href="#内网环境" aria-hidden="true">#</a> 内网环境</h2><p>在内网环境下，两台服务之间通过 HTTP/3 通信，可以采用类似的流程，但需要注意以下几点：</p><ul><li>确保服务端证书中包含目标服务的 <strong>内网 IP 地址</strong> 或 <strong>主机名</strong>，这样客户端可以正确验证服务端证书。</li><li>两台服务之间的网络连接应允许指定端口的访问（如 4433）。</li></ul><p>其他的操作和上面一致，只是在创建自签名证书时有所不同：</p><p><strong>创建自签名证书（添加内网 IP 和主机名到 SAN）</strong></p><p>假设服务的内网地址为 192.168.1.10，主机名为 my-internal-server：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-new</span> <span class="token parameter variable">-key</span> server.key <span class="token parameter variable">-out</span> server.crt <span class="token parameter variable">-days</span> <span class="token number">365</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-subj</span> <span class="token string">&quot;/CN=my-internal-server&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-addext</span> <span class="token string">&quot;subjectAltName=DNS:my-internal-server,IP:192.168.1.10&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后客户端访问的时候需要设置serverName</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 配置 TLS 客户端</span>
tlsConfig <span class="token operator">:=</span> <span class="token operator">&amp;</span>tls<span class="token punctuation">.</span>Config<span class="token punctuation">{</span>
  RootCAs<span class="token punctuation">:</span>    caCertPool<span class="token punctuation">,</span>
  ServerName<span class="token punctuation">:</span> <span class="token string">&quot;my-internal-server&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 必须与证书中的 CN 或 SAN 字段匹配</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然也可以不设置主机名：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-new</span> <span class="token parameter variable">-key</span> server.key <span class="token parameter variable">-out</span> server.crt <span class="token parameter variable">-days</span> <span class="token number">365</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-subj</span> <span class="token string">&quot;/CN=192.168.1.10&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-addext</span> <span class="token string">&quot;subjectAltName=IP:192.168.1.10&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就不用指定主机名了。</p><p>这里决定的是代码中你是使用什么连接服务器，如果是ip去连接<code>https://192.168.1.10:4433/</code>，就不用指定ServerName。因为这个主机名是个虚拟主机名，他需要根据DNS去解析的。</p><h2 id="其他知识" tabindex="-1"><a class="header-anchor" href="#其他知识" aria-hidden="true">#</a> 其他知识</h2><h3 id="文件后缀" tabindex="-1"><a class="header-anchor" href="#文件后缀" aria-hidden="true">#</a> 文件后缀</h3><p>证书文件的名称通常以 .pem、.crt、.cer 或 .key 结尾，具体使用哪种扩展名主要是基于约定，而非格式上的强制要求。.pem 是一种常见的格式，它可以包含证书、密钥或其他加密材料。</p><p><strong>1. 什么是 .pem</strong></p><p><code>.pem</code> 是一种 <strong>容器格式</strong>，可以存储证书、密钥和其他加密材料。</p><p>文件内容通常是 Base64 编码的，格式如下：</p><div class="language-pem line-numbers-mode" data-ext="pem"><pre class="language-pem"><code>-----BEGIN CERTIFICATE-----

&lt;证书内容&gt;

-----END CERTIFICATE-----

-----BEGIN PRIVATE KEY-----

&lt;私钥内容&gt;

-----END PRIVATE KEY-----
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>.pem 文件可以包含：</p><ul><li><strong>证书</strong>：服务器证书、客户端证书或根证书。</li><li><strong>私钥</strong>：与证书配套的私钥。</li><li><strong>证书链</strong>：多个证书拼接在一个 .pem 文件中。</li></ul><p><strong>2. 其他常见的扩展名</strong></p><p><strong>扩展名</strong> <strong>用途</strong> <strong>内容</strong></p><p>.crt 通常用于证书 仅包含单个证书（可能是 Base64 编码，也可能是二进制 DER 格式）。</p><p>.cer 类似于 .crt 仅包含证书，通常是 DER 格式，也可以是 Base64（与 .crt 基本无区别，扩展名取决于系统偏好）。</p><p>.key 通常用于存储私钥 包含私钥，可能是 PEM 或其他格式（如 PKCS#8）。</p><p>.p12 / .pfx 包含证书和私钥的二进制文件 PKCS#12 格式，包含证书、私钥和链信息，用于导入和导出证书。</p><p>.pem 可以包含证书、私钥或两者的组合 以 Base64 编码格式存储加密材料。</p><p><strong>4. 如何选择扩展名</strong></p><p>如果文件只包含证书：.crt 或 .pem 都可以。.pem 常用于与 OpenSSL 或 QUIC 库结合使用。</p><p>如果文件包含私钥：推荐使用 .pem，因为它能同时存储证书和私钥。</p><p>如果需要传输私钥和证书的组合：使用 .p12 / .pfx（适合 PKCS#12 格式）。</p><p><strong>5. 格式转换</strong></p><p>可以用 OpenSSL 进行各种格式之间的转换：</p><p><strong>将 .crt 转为 .pem</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl x509 <span class="token parameter variable">-in</span> server.crt <span class="token parameter variable">-out</span> server.pem <span class="token parameter variable">-outform</span> PEM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>提取私钥到 .pem</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl rsa <span class="token parameter variable">-in</span> server.key <span class="token parameter variable">-out</span> private.pem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>转换 .pem 到 .pfx</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl pkcs12 <span class="token parameter variable">-export</span> <span class="token parameter variable">-in</span> server.pem <span class="token parameter variable">-out</span> server.pfx <span class="token parameter variable">-inkey</span> server.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,69),c=[l];function r(u,d){return s(),a("div",null,c)}const k=n(i,[["render",r],["__file","quicgo.html.vue"]]);export{k as default};
