practice
===================================
cookie
-----------------------------------
# 由于http是无状态协议,为了保持一个状态,引出cookie;
## cookie处理流程
cookie处理的3个步骤<br />
1. 服务器向客户端发送Cookie;<br />
2. 浏览器将cookie保存;<br />
3. 之后每次浏览器发送都会携带cookie;<br />
## 客户端和服务器处理cookie的具体形式
1. 客户端发送的Cookie在请求报文的Cookie字段上,我们可以通过curl工具构造这个字段，
如下:<br />
curl -v -H "Cookie: foo=bar; baz = val" "http://localhost:9000"
2. 服务器这边,HTTP_Parser会将报文信息解析到req.header字段上;那么Cookie就是
req.header.cookie。这里获取的是cookie的字段串,通过自定义解析把cookie解析成
JSON数据。(parseCookie方法);<br />
3. 服务器将更新的cookie信息发送至客户端;
> 1. 告知客户端的方式是通过相应报文形式实现的。
> 2. 相应的Cookie值设置到Set-Cookie字段中。
> 3. 客户端收到Set-Cookie响应后,之后的请求会加上Cookie字段中值

session
-----------------------------------			
# 通过cookie,浏览器和服务器可以实现状态记录,但是cookie最为严重的问题是不安全(cookie在前后端容易被修改),引出session.
## 1.基于cookie实现用户和数据的映射
使用session安全的原因:<br />
1. 虽然将所有数据放到Cookie中不可取,但是将口令放到Cookie中是可以的。因为口令被修改,<br />
丢失映射关系,从而无法修改服务器端数据。
2. session有效期非常短,通常20min内服务器和客户端没有交互行为,服务端数据将要被删除。<br />
3. 生成session口令的方法,(generate)
